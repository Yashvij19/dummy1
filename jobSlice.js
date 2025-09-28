
// src/features/jobs/jobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { runAgent } from '../../services/externalApiService';

const STORAGE_KEY = 'agent_runs_v1';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load jobs from storage', e);
    return [];
  }
};

const saveToStorage = (jobs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch (e) {
    console.error('Failed to save jobs to storage', e);
  }
};

export const startRunJob = createAsyncThunk(
  'jobs/startRunJob',
  async ({ agentData }, { dispatch, getState, rejectWithValue }) => {
    if (!agentData) return rejectWithValue('Agent data required');

    const jobId = uuidv4();
    const startTime = new Date().toISOString();

    // Enhanced job entry with all data
    
    // Enhanced job entry with all data
const job = {
  id: jobId,
  agentId: agentData.id || null,
  agentName: agentData.agentName || 'Unknown',
  category: agentData.category || '',
  Description: agentData.Description || '',
  image: agentData.image || '',
  status: 'ongoing',
  startTime,
  endTime: null,
  durationMs: null,
  responseHtml: null,
  error: null,
  // Dates if provided
  startDate: agentData.startDate || null,
  endDate: agentData.endDate || null,
  // 🔥 NEW — Store inputValueData (instead of old toggle flags)
  inputValueData: agentData.inputValueData || [],
  // Keep other metadata
  companyName: agentData.companyName || '',
  modelName: agentData.modelName || '',
  instruction: agentData.instruction || '',
  welcomeMessage: agentData.welcomeMessage || '',
  toolData: agentData.toolData || null,

  // Store full original agent data (good for reconstruction)
  rawAgentData: agentData
};


    // Add job to local storage immediately
    const current = loadFromStorage();
    const newJobs = [job, ...current];
    saveToStorage(newJobs);
    // Trigger a reducer to add job (so UI updates right away)
    dispatch(jobStarted(job));

    try {
      console.log('Running agent with data:', agentData);
      const result = await runAgent(agentData);
      console.log('Agent run result:', result);

      // Extract HTML message - adjust this path based on your actual API response structure
      let responseHtml = null;
      
      // Try different paths where the HTML might be
      if (result?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message) {
        responseHtml = result.outputs[0].outputs[0].outputs.message.message;
      } else if (result?.message) {
        responseHtml = result.message;
      } else if (result?.html) {
        responseHtml = result.html;
      } else if (result?.data?.html) {
        responseHtml = result.data.html;
      } else if (typeof result === 'string') {
        responseHtml = result;
      }

      console.log('Extracted HTML:', responseHtml);

      const endTime = new Date().toISOString();
      const durationMs = new Date(endTime) - new Date(startTime);

      // Update job record with response
      const updatedJob = {
        ...job,
        status: 'completed',
        endTime,
        durationMs,
        responseHtml: responseHtml || '<p>No response received from agent.</p>',
        error: null,
      };

      // Update storage
      const after = loadFromStorage().map((j) => (j.id === jobId ? updatedJob : j));
      saveToStorage(after);

      // Dispatch update to store
      dispatch(jobCompleted(updatedJob));

      // Return job for thunk fulfilled
      return updatedJob;
    } catch (err) {
      console.error('runAgent failed for job', jobId, err);
      const endTime = new Date().toISOString();
      const durationMs = new Date(endTime) - new Date(startTime);

      const updatedJob = {
        ...job,
        status: 'rejected',
        endTime,
        durationMs,
        responseHtml: null,
        error: err?.message || String(err),
      };

      const after = loadFromStorage().map((j) => (j.id === jobId ? updatedJob : j));
      saveToStorage(after);

      dispatch(jobFailed(updatedJob));
      return rejectWithValue(updatedJob);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    entities: loadFromStorage(), // load persisted jobs
    status: 'idle',
    error: null,
  },
  reducers: {
    // local-only actions that mirror storage updates
    jobStarted(state, action) {
      state.entities.unshift(action.payload);
    },
    jobCompleted(state, action) {
      const idx = state.entities.findIndex((j) => j.id === action.payload.id);
      if (idx !== -1) {
        state.entities[idx] = action.payload;
      }
    },
    jobFailed(state, action) {
      const idx = state.entities.findIndex((j) => j.id === action.payload.id);
      if (idx !== -1) {
        state.entities[idx] = action.payload;
      }
    },
    jobDeleted(state, action) {
      state.entities = state.entities.filter((j) => j.id !== action.payload);
      saveToStorage(state.entities);
    },
    loadJobs(state) {
      state.entities = loadFromStorage();
    },
    clearJobs(state) {
      state.entities = [];
      saveToStorage([]);
    },
    // Add a manual refresh action
    refreshJobsFromStorage(state) {
      const stored = loadFromStorage();
      state.entities = stored;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(startRunJob.pending, (s) => { s.status = 'loading'; })
      .addCase(startRunJob.fulfilled, (s, action) => {
        s.status = 'succeeded';
        // jobCompleted reducer already updated entity
      })
      .addCase(startRunJob.rejected, (s, action) => {
        s.status = 'failed';
        // jobFailed reducer already updated entity
      });
  }
});

export const {
  jobStarted,
  jobCompleted,
  jobFailed,
  jobDeleted,
  loadJobs,
  clearJobs,
  refreshJobsFromStorage
} = jobsSlice.actions;

export default jobsSlice.reducer;
