
import React, { useState, useEffect, useRef } from "react";
import "./AgentSideBar.css";
import { useDispatch, useSelector } from "react-redux";
import { startRunJob } from "../../../../features/jobs/jobsSlice";
import HtmlContent from "../htmlContext/HtmlContent";
import AgentInput from "./agentInput"; // child component (local file)
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import isEqual from "lodash/isEqual";

const AgentSideBar = ({ agentData, jobData, isOpen, onClose }) => {
  const [sourceAgent, setSourceAgent] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [showResponseView, setShowResponseView] = useState(false);

  // child-provided updated inputValueData + validity
  const [childInputValueData, setChildInputValueData] = useState(null);
  const [childIsValid, setChildIsValid] = useState(true);

  const responseRef = useRef(null);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.entities);

  // Normalize incoming agent/job data
  const buildSourceAgent = () => {
    const base = jobData || agentData || {};
    return {
      ...base,
      Description: base.Description || base.description || "",
      category: base.category || base.Category || "",
      modelName: base.modelName || base.ModelName || "",
      agentName: base.agentName || base.AgentName || "",
      inputValueData: base.inputValueData || [],
      // keep other fields present if needed
    };
  };

  useEffect(() => {
    const normalized = buildSourceAgent();
    setSourceAgent(normalized);

    // If jobData already completed and has responseHtml, show immediately
    if (jobData) {
      if (jobData.status === "completed" && jobData.responseHtml) {
        setApiResponse(jobData.responseHtml);
        setError(null);
        setLoading(false);
        setShowResponseView(true);
        setCurrentJobId(null);
      } else if (jobData.status === "ongoing") {
        setApiResponse(null);
        setError(null);
        setLoading(true);
        setShowResponseView(false);
        setCurrentJobId(jobData.id);
      } else if (jobData.status === "rejected") {
        setApiResponse(null);
        setError(jobData.error || "Job failed");
        setLoading(false);
        setShowResponseView(false);
      }
    } else {
      // Fresh agent: reset response & error
      setApiResponse(null);
      setError(null);
      setLoading(false);
      setCurrentJobId(null);
      setShowResponseView(false);
    }

    // initialize child data to agent's inputValueData
    setChildInputValueData(normalized.inputValueData || []);
    setChildIsValid(true);
  }, [agentData, jobData]);

  // Listen for job updates from Redux store and update UI
  useEffect(() => {
    if (currentJobId && jobs) {
      const updatedJob = jobs.find((j) => j.id === currentJobId);
      if (updatedJob) {
        console.log("Job updated:", updatedJob);
        if (updatedJob.status === "completed" && updatedJob.responseHtml) {
          setApiResponse(updatedJob.responseHtml);
          setLoading(false);
          setShowResponseView(true);
        } else if (updatedJob.status === "rejected") {
          setError(updatedJob.error || "Job failed");
          setLoading(false);
          setShowResponseView(false);
        } else if (updatedJob.status === "ongoing") {
          setLoading(true);
          setShowResponseView(false);
        }
      }
    }
  }, [jobs, currentJobId]);

  if (!isOpen) return null;

  const handleChildChange = (updatedInputValueData, isValid) => {
  setChildInputValueData((prev) =>
    isEqual(prev, updatedInputValueData) ? prev : updatedInputValueData
  );
  setChildIsValid((prev) => (prev !== isValid ? isValid : prev));
};

  const handleDownloadPdf = async () => {
    if (!responseRef.current) return;
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 10,
        filename: `${sourceAgent?.agentName || "agent"}-response.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: responseRef.current.scrollWidth },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(responseRef.current).save();
    } catch (e) {
      console.error("PDF download failed:", e);
    }
  };

  // Main run handler that uses childInputValueData
  const handleRun = async () => {
    try {
      // validation: child must report valid
      if (!childIsValid) {
        setError("Please fill all required fields correctly.");
        return;
      }

      setLoading(true);
      setError(null);
      setApiResponse(null);
      setShowResponseView(false);

      // Build enrichedData preserving other sourceAgent fields,
      // but replacing inputValueData with the child's version (which
      // contains default values or user-supplied values).
      const enrichedData = {
        ...sourceAgent,
        inputValueData: childInputValueData || sourceAgent.inputValueData || [],
        // include any flags if you want, e.g. timestamp
        _generatedAt: format(new Date(), "MM/dd/yyyy HH:mm:ss"),
      };

      // Dispatch job
      const resultAction = await dispatch(startRunJob({ agentData: enrichedData }));

      if (startRunJob.fulfilled.match(resultAction)) {
        const job = resultAction.payload;
        setCurrentJobId(job.id);
        // useEffect will update UI when job completes
      } else {
        setError("Failed to start job");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error running agent:", err);
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  // If we already have apiResponse and showResponseView true, show response panel
  if (apiResponse && showResponseView) {
    return (
      <div className="sidebar-overlay" onClick={onClose}>
        <div className="sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-header">
            <h2>{sourceAgent?.agentName || "Agent"} - Response</h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="run-btn" onClick={handleDownloadPdf}>
                Download PDF
              </button>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>
          </div>

          <div className="sidebar-content" style={{ padding: "20px" }}>
            <div ref={responseRef} className="mt-3">
              <HtmlContent html={apiResponse} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal sidebar (form + dynamic child)
  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>Agent Details</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          <div className="form-group">
            <label>Agent Name*</label>
            <input type="text" value={sourceAgent.agentName || ""} readOnly />
            <p className="description">{sourceAgent.Description || ""}</p>
          </div>

          {/* Child dynamic form */}
          <div className="form-group">
            <label>Inputs</label>
            <AgentInput
              inputValueData={sourceAgent.inputValueData || []}
              disabled={loading || (jobData && jobData.status === "completed")}
              onChange={handleChildChange}
            />
          </div>

          <div className="run-btn-container">
            {jobData?.status === "completed" ? (
              <div className="status-info">Job completed - Click view to see response</div>
            ) : loading ? (
              <button className="run-btn" disabled>
                Running...
              </button>
            ) : (
              <button className="run-btn" onClick={handleRun}>
                Run
              </button>
            )}
          </div>

          {error && <div className="error">Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default AgentSideBar;
