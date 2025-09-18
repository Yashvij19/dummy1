// // src/components/Agents/AgentSideBar.jsx
// import React, { useState, useEffect } from "react";
// import "./AgentSideBar.css";
// import { runAgent } from "../../../../services/externalApiService";
// import HtmlContent from "../htmlContext/HtmlContent";

// const AgentSideBar = ({ agentData, isOpen, onClose }) => {
//   const [companyName, setCompanyName] = useState("");
//   const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (agentData?.knowledgeBaseData) {
//       setSelectedKnowledgeBases([...agentData.knowledgeBaseData]);
//     }
//   }, [agentData]);

//   if (!isOpen) return null;

//   const getAllToolsFromSelectedBases = () => {
//     const allTools = [];
//     selectedKnowledgeBases.forEach((kb) => {
//       if (kb.knowledgetools) {
//         allTools.push(...kb.knowledgetools);
//       }
//     });
//     return allTools;
//   };

//   const removeKnowledgeBase = (kbToRemove) => {
//     setSelectedKnowledgeBases((prev) =>
//       prev.filter((kb) => kb.name !== kbToRemove.name)
//     );
//   };

//   const handleRun = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setApiResponse(null);

//       // merge companyName into agentData
//       const enrichedData = { ...agentData, companyName };

//       // Call API service
//       const result = await runAgent(enrichedData);

//       setApiResponse(result.outputs[0].outputs[0].outputs.message.message);
//       console.log("API Response:", result);
//     } catch (err) {
//       console.error("Error running agent:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="sidebar-overlay" onClick={onClose}>
//       <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className="sidebar-header">
//           <h2>Agent Details</h2>
//           <button className="close-btn" onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         {/* Agent Name */}
//         <div className="form-group">
//           <label>Agent Name*</label>
//           <input type="text" value={agentData.agentName} readOnly />
//           <p className="description">{agentData.Description}</p>
//         </div>

//         {/* Company Name */}
//         <div className="form-group">
//           <label>Company Name*</label>
//           <input
//             type="text"
//             placeholder="Enter company name"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />
//         </div>

//         {/* Knowledge Base Names as Chips */}
//         <div className="form-group">
//           <label>Knowledge Base</label>
//           <div className="knowledge-base-container">
//             {selectedKnowledgeBases.length > 0 ? (
//               <div className="tags">
//                 {selectedKnowledgeBases.map((kb, index) => (
//                   <span key={index} className="tag removable-tag">
//                     {kb.name}
//                     <button
//                       className="remove-tag-btn"
//                       onClick={() => removeKnowledgeBase(kb)}
//                       type="button"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-selection">No knowledge bases selected</div>
//             )}
//           </div>
//         </div>

//         {/* Tools from Knowledge Bases */}
//         <div className="form-group">
//           <label>Custom Models</label>
//           <div className="tools-container">
//             {getAllToolsFromSelectedBases().length > 0 ? (
//               <div className="tags">
//                 {getAllToolsFromSelectedBases().map((tool, idx) => (
//                   <span key={idx} className="tag readonly-tag">
//                     {tool}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-selection">No tools available</div>
//             )}
//           </div>
//         </div>

//         {/* Agent Tools */}
//         {/* <div className="form-group">
//           <label>Agent Tools*</label>
//           <div className="tags">
//             {agentData.toolData?.tools?.length > 0 ? (
//               agentData.toolData.tools.map((tool, idx) => (
//                 <span key={idx} className="tag">
//                   {tool}
//                 </span>
//               ))
//             ) : (
//               <span>No tools available</span>
//             )}
//           </div>
//         </div> */}

//         {/* Run Button */}
//         <div className="run-btn-container">
//           <button className="run-btn" onClick={handleRun} disabled={loading}>
//             {loading ? "Running..." : "Run"}
//           </button>
//         </div>

//         <HtmlContent html={apiResponse} className="mt-3" />

       

//         {/* Error */}
//         {error && <div className="error">Error: {error}</div>}
//       </div>
//     </div>
//   );
// };

// export default AgentSideBar;

// ----------------------------final --------------------------------------

// src/components/Agents/AgentSideBar.jsx
// import React, { useState, useEffect } from "react";
// import "./AgentSideBar.css";
// import { runAgent } from "../../../../services/externalApiService";
// import HtmlContent from "../htmlContext/HtmlContent";

// const AgentSideBar = ({ agentData, isOpen, onClose }) => {
//   const [companyName, setCompanyName] = useState("");
//   const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (agentData?.knowledgeBaseData) {
//       setSelectedKnowledgeBases([...agentData.knowledgeBaseData]);
//     }
//   }, [agentData]);

//   if (!isOpen) return null;

//   const getAllToolsFromSelectedBases = () => {
//     const allTools = [];
//     selectedKnowledgeBases.forEach((kb) => {
//       if (kb.knowledgetools) {
//         allTools.push(...kb.knowledgetools);
//       }
//     });
//     return allTools;
//   };

//   const removeKnowledgeBase = (kbToRemove) => {
//     setSelectedKnowledgeBases((prev) =>
//       prev.filter((kb) => kb.name !== kbToRemove.name)
//     );
//   };

//   const handleRun = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setApiResponse(null);

//       // merge companyName into agentData
//       const enrichedData = { ...agentData, companyName };

//       // Call API service
//       const result = await runAgent(enrichedData);

//       // Safely extract the message (guard against unexpected shapes)
//       const msg =
//         result?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message ?? null;

//       if (!msg) {
//         throw new Error("No response content returned from the agent.");
//       }

//       setApiResponse(msg);
//       console.log("API Response:", result);
//     } catch (err) {
//       console.error("Error running agent:", err);
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟢 After response: show only the response (hide everything else)
//   if (apiResponse) {
//     return (
//       <div className="sidebar-overlay" onClick={onClose}>
//         <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//           <HtmlContent html={apiResponse} className="mt-3" />
//         </div>
//       </div>
//     );
//   }

//   // 🔵 Before response: show the normal sidebar UI
//   return (
//     <div className="sidebar-overlay" onClick={onClose}>
//       <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className="sidebar-header">
//           <h2>Agent Details</h2>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         {/* Agent Name */}
//         <div className="form-group">
//           <label>Agent Name*</label>
//           <input type="text" value={agentData.agentName} readOnly />
//           <p className="description">{agentData.Description}</p>
//         </div>

//         {/* Company Name */}
//         <div className="form-group">
//           <label>Company Name*</label>
//           <input
//             type="text"
//             placeholder="Enter company name"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />
//         </div>

//         {/* Knowledge Base Names as Chips */}
//         <div className="form-group">
//           <label>Knowledge Base</label>
//           <div className="knowledge-base-container">
//             {selectedKnowledgeBases.length > 0 ? (
//               <div className="tags">
//                 {selectedKnowledgeBases.map((kb, index) => (
//                   <span key={index} className="tag removable-tag">
//                     {kb.name}
//                     <button
//                       className="remove-tag-btn"
//                       onClick={() => removeKnowledgeBase(kb)}
//                       type="button"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-selection">No knowledge bases selected</div>
//             )}
//           </div>
//         </div>

//         {/* Tools from Knowledge Bases */}
//         <div className="form-group">
//           <label>Custom Models</label>
//           <div className="tools-container">
//             {getAllToolsFromSelectedBases().length > 0 ? (
//               <div className="tags">
//                 {getAllToolsFromSelectedBases().map((tool, idx) => (
//                   <span key={idx} className="tag readonly-tag">
//                     {tool}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-selection">No tools available</div>
//             )}
//           </div>
//         </div>

//         {/* Run Button */}
//         <div className="run-btn-container">
//           <button className="run-btn" onClick={handleRun} disabled={loading}>
//             {loading ? "Running..." : "Run"}
//           </button>
//         </div>

//         {/* Error */}
//         {error && <div className="error">Error: {error}</div>}
//       </div>
//     </div>
//   );
// };

// export default AgentSideBar;




// // src/components/Agents/AgentSideBar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import "./AgentSideBar.css";
// import { runAgent } from "../../../../services/externalApiService";
// import HtmlContent from "../htmlContext/HtmlContent";

// const FEATURE_LABELS = {
//   citations: "Citations",
//   toolCitations: "Tool citations",
//   uploadFile: "Upload file",
//   followUpSuggestions: "Follow-up suggestions",
//   voiceConfiguration: "Voice configuration",
// };

// const AgentSideBar = ({ agentData, isOpen, onClose }) => {
//   const [companyName, setCompanyName] = useState("");
//   const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
//   const [flags, setFlags] = useState({
//     citations: false,
//     toolCitations: false,
//     uploadFile: false,
//     followUpSuggestions: false,
//     voiceConfiguration: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const responseRef = useRef(null);

//   // init when agent changes
//   useEffect(() => {
//     if (agentData?.knowledgeBaseData) {
//       setSelectedKnowledgeBases([...agentData.knowledgeBaseData]);
//     }
//     setFlags({
//       citations: !!agentData?.citations,
//       toolCitations: !!agentData?.toolCitations,
//       uploadFile: !!agentData?.uploadFile,
//       followUpSuggestions: !!agentData?.followUpSuggestions,
//       voiceConfiguration: !!agentData?.voiceConfiguration,
//     });
//     setCompanyName(""); // reset on change if you prefer
//     setApiResponse(null);
//     setError(null);
//   }, [agentData]);

//   if (!isOpen) return null;

//   // knowledge base removal (unchanged UX)
//   const removeKnowledgeBase = (kbToRemove) => {
//     setSelectedKnowledgeBases((prev) =>
//       prev.filter((kb) => kb.name !== kbToRemove.name)
//     );
//   };

//   // feature chip removal
//   const handleRemoveFlag = (key) => {
//     setFlags((prev) => ({ ...prev, [key]: false }));
//   };

//   const handleRun = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setApiResponse(null);

//       // build payload: current booleans + selected KBs + companyName + rest of agent
//       const enrichedData = {
//         ...agentData,
//         ...flags,
//         knowledgeBaseData: selectedKnowledgeBases,
//         companyName,
//       };

//       const result = await runAgent(enrichedData);

//       // keep your current safe extractor
//       const msg =
//         result?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message ?? null;

//       if (!msg) throw new Error("No response content returned from the agent.");

//       setApiResponse(msg);
//     } catch (err) {
//       console.error("Error running agent:", err);
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // download the rendered HTML as PDF
//   const handleDownloadPdf = async () => {
//     if (!responseRef.current) return;
//     try {
//       const html2pdf = (await import("html2pdf.js")).default;

//       const opt = {
//         margin: 10,
//         filename: `${agentData?.agentName || "agent"}-response.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true, windowWidth: responseRef.current.scrollWidth },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       await html2pdf().set(opt).from(responseRef.current).save();
//     } catch (e) {
//       console.error("PDF download failed:", e);
//     }
//   };

//   // 🟢 After response: overlay showing response + download button
//   if (apiResponse) {
//     return (
//       <div className="sidebar-overlay" onClick={onClose}>
//         <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//           <div className="sidebar-header">
//             <h2>Agent Response</h2>
//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <button className="run-btn" onClick={handleDownloadPdf}>
//                 Download PDF
//               </button>
//               <button className="close-btn" onClick={onClose}>✕</button>
//             </div>
//           </div>

//           <div ref={responseRef} className="mt-3">
//             <HtmlContent html={apiResponse} />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 🔵 Before response: normal sidebar with KB chips + feature chips + run
//   const activeFlags = Object.entries(flags).filter(([_, val]) => val);

//   return (
//     <div className="sidebar-overlay" onClick={onClose}>
//       <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className="sidebar-header">
//           <h2>Agent Details</h2>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         {/* Agent Name */}
//         <div className="form-group">
//           <label>Agent Name*</label>
//           <input type="text" value={agentData.agentName} readOnly />
//           <p className="description">{agentData.Description}</p>
//         </div>

//         {/* Company Name */}
//         <div className="form-group">
//           <label>Company Name*</label>
//           <input
//             type="text"
//             placeholder="Enter company name"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />
//         </div>

//         {/* Knowledge Base names as removable chips (unchanged) */}
//         <div className="form-group">
//           <label>Knowledge Base</label>
//           <div className="knowledge-base-container">
//             {selectedKnowledgeBases.length > 0 ? (
//               <div className="tags">
//                 {selectedKnowledgeBases.map((kb, index) => (
//                   <span key={index} className="tag removable-tag">
//                     {kb.name}
//                     <button
//                       className="remove-tag-btn"
//                       onClick={() => removeKnowledgeBase(kb)}
//                       type="button"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <div className="no-selection">No knowledge bases selected</div>
//             )}
//           </div>
//         </div>

//         {/* ✅ Feature chips (only TRUE appear; removable sets to false) */}
//         <div className="form-group">
//           <label>Features</label>
//           <div className="tags">
//             {activeFlags.length > 0 ? (
//               activeFlags.map(([key]) => (
//                 <span key={key} className="tag removable-tag">
//                   {FEATURE_LABELS[key] || key}
//                   <button
//                     className="remove-tag-btn"
//                     onClick={() => handleRemoveFlag(key)}
//                     type="button"
//                   >
//                     ✕
//                   </button>
//                 </span>
//               ))
//             ) : (
//               <span className="no-selection">No features enabled</span>
//             )}
//           </div>
//         </div>

//         {/* Run */}
//         <div className="run-btn-container">
//           <button className="run-btn" onClick={handleRun} disabled={loading}>
//             {loading ? "Running..." : "Run"}
//           </button>
//         </div>

//         {/* Error */}
//         {error && <div className="error">Error: {error}</div>}
//       </div>
//     </div>
//   );
// };

// export default AgentSideBar;



// // src/components/Agents/AgentSideBar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import "./AgentSideBar.css";
// // import { runAgent } from "../../../../services/externalApiService";
// import { useDispatch } from "react-redux";
// import { startRunJob } from "../../../../features/jobs/jobsSlice";
// import { runAgent } from "../../../../services/externalApiService";
// import HtmlContent from "../htmlContext/HtmlContent";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";


// const AgentSideBar = ({ agentData,jobData ,  isOpen, onClose }) => {
//   const [companyName, setCompanyName] = useState("");
//   const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
//   const [startDate, setStartDate] = useState(null);
// const [endDate, setEndDate] = useState(null);

//   const [toggles, setToggles] = useState({
//     isKnowledgebase: false,
//     isInputParams: false,
//     isCategories: false,
//     isModel: false,
//     isAccess: false,
//   });

//    const [loading, setLoading] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null);
//   const [error, setError] = useState(null);


//   const responseRef = useRef(null);
//   const dispatch = useDispatch();


//   // init when agent changes
//   // useEffect(() => {
  
//   //  if (sourceAgent?.knowledgeBaseData) {
//   //     setSelectedKnowledgeBases([...sourceAgent.knowledgeBaseData]);
//   //   }
//   //   setToggles({
//   //     isKnowledgebase: !!sourceAgent?.isKnowledgebase,
//   //     isInputParams: !!sourceAgent?.isInputParams,
//   //     isCategories: !!sourceAgent?.isCategories,
//   //     isModel: !!sourceAgent?.isModel,
//   //     isAccess: !!sourceAgent?.isAccess,
//   //   });
//   //   setCompanyName("");
//   //   // if jobData has a responseHtml, show it
//   //   if (jobData) {
//   //     setApiResponse(jobData.responseHtml || null);
//   //     setError(jobData.error || null);
//   //     setLoading(jobData.status === 'ongoing');
//   //   } else {
//   //     setApiResponse(null);
//   //     setError(null);
//   //     setLoading(false);
//   //   }
//   // }, [agentData]);


//   const buildSourceAgent = () => {
//   if (jobData) {
//     return {
//       ...jobData,
//       // normalize fields so sidebar JSX doesn’t break
//       Description: jobData.Description || jobData.description || "",
//       category: jobData.category || jobData.Category || "",
//       modelName: jobData.modelName || jobData.ModelName || "",
//       agentName: jobData.agentName || jobData.AgentName || "",
//       knowledgeBaseData: jobData.knowledgeBaseData || [],
//     };
//   }
//   return agentData || {};
// };

// const [sourceAgent, setSourceAgent] = useState({});

// useEffect(() => {
//   const normalized = buildSourceAgent();
//   setSourceAgent(normalized);

//   if (normalized.knowledgeBaseData) {
//     setSelectedKnowledgeBases([...normalized.knowledgeBaseData]);
//   }

//   setToggles({
//     isKnowledgebase: !!normalized.isKnowledgebase,
//     isInputParams: !!normalized.isInputParams,
//     isCategories: !!normalized.isCategories,
//     isModel: !!normalized.isModel,
//     isAccess: !!normalized.isAccess,
//   });

//   setCompanyName("");

//   if (jobData) {
//     setApiResponse(jobData.responseHtml || null);
//     setError(jobData.error || null);
//     setLoading(jobData.status === "ongoing");
//     setStartDate(jobData.startDate ? new Date(jobData.startDate) : null);
//   setEndDate(jobData.endDate ? new Date(jobData.endDate) : null);
//   } else {
//     setApiResponse(null);
//     setError(null);
//     setLoading(false);
//   }
// }, [agentData, jobData]);


//   if (!isOpen) return null;

//   // knowledge base removal (unchanged UX)
//   const removeKnowledgeBase = (kbToRemove) => {
//     setSelectedKnowledgeBases((prev) =>
//       prev.filter((kb) => kb.name !== kbToRemove.name)
//     );
//   };

//   // toggle handler
//   // const handleToggleChange = (key) => {
//   //   setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
//   // };

//   const handleRun = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setApiResponse(null);

//       const formattedStartDate = startDate ? format(startDate, "MM/dd/yyyy") : "";
//       const formattedEndDate = endDate ? format(endDate, "MM/dd/yyyy") : "";

//       const updatedKnowledgeBaseData = (agentData?.knowledgeBaseData || []).map((kb) => ({
//         ...kb,
//         StartDate: formattedStartDate,
//         EndDate: formattedEndDate,
//       }));

//       const enrichedData = {
//         ...agentData,
//         ...toggles,
//         knowledgeBaseData: updatedKnowledgeBaseData,
//         companyName,
//          startDate: formattedStartDate,   // 🟢 keep dates at top level too
//       endDate: formattedEndDate,
//       };

//       // Dispatch startRunJob which will persist the job, run the API async, and update job when done.
//       dispatch(startRunJob({ agentData: enrichedData }));

    
//     } catch (err) {
//       console.error("Error running agent:", err);
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // download the rendered HTML as PDF
//   const handleDownloadPdf = async () => {
//     if (!responseRef.current) return;
//     try {
//       const html2pdf = (await import("html2pdf.js")).default;

//       const opt = {
//         margin: 10,
//         filename: `${sourceAgent?.agentName || "agent"}-response.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true, windowWidth: responseRef.current.scrollWidth },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       await html2pdf().set(opt).from(responseRef.current).save();
//     } catch (e) {
//       console.error("PDF download failed:", e);
//     }
//   };

//   // 🟢 After response: overlay showing response + download button
//   if (apiResponse) {
//     return (
//       <div className="sidebar-overlay" onClick={onClose}>
//         <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//           <div className="sidebar-header">
//             <h2>Agent Response</h2>
//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <button className="run-btn" onClick={handleDownloadPdf}>
//                 Download PDF
//               </button>
//               <button className="close-btn" onClick={onClose}>✕</button>
//             </div>
//           </div>

//           <div ref={responseRef} className="mt-3">
//             <HtmlContent html={apiResponse} />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 🔵 Before response: normal sidebar with toggles and conditional sections
//   return (
//     <div className="sidebar-overlay" onClick={onClose}>
//       <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className="sidebar-header">
//           <h2>Agent Details</h2>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         {/* Agent Name */}
//         <div className="form-group">
//           <label>Agent Name*</label>
//            <input type="text" value={sourceAgent.agentName || ""} readOnly />
//   <p className="description">{sourceAgent.Description || ""}</p>
//         </div>

//         {/* Category Badge - visible if isCategories is true */}
//  {toggles.isCategories && (
//   <div className="form-group">
//     <label>Category</label>
//     <div className="category-badge">
//          {sourceAgent.category || "No category"}
//     </div>
//   </div>
// )}

// <div className="form-group" >
//   <label>Start Date</label>
//   <DatePicker id="date-picker-group"
//     selected={startDate}
//     onChange={(date) => setStartDate(date)}
//     dateFormat="MM/dd/yyyy"
//     className="form-control custom-datepicker"
//     popperClassName="custom-datepicker"
//     placeholderText="Select start date"
//   />
// </div>

// <div className="form-group" id="ff1">
//   <label>End Date</label>
//   <DatePicker id="date-picker-group"
//     selected={endDate}
//     onChange={(date) => setEndDate(date)}
//     dateFormat="MM/dd/yyyy"
//     className="form-control custom-datepicker"
//     placeholderText="Select end date"
//     popperClassName="custom-datepicker"
//   />
// </div>


// {/* Model Name - visible if isModel is true */}
// {toggles.isModel && (
//   <div className="form-group">
//     <label>Model</label>
//     <input type="text" value={sourceAgent.modelName || ""} readOnly />
//   </div>
// )}

// {/* Company Name - visible if isInputParams is true */}
// {toggles.isInputParams && (
//   <div className="form-group">
//     <label>Company Name*</label>
//     <input
//       type="text"
//       placeholder="Enter company name"
//       value={companyName}
//       onChange={(e) => setCompanyName(e.target.value)}
//     />
//   </div>
// )}

// {/* Knowledge Base - visible if isKnowledgebase is true */}
// {toggles.isKnowledgebase && (
//   <div className="form-group">
//     <label>Knowledge Base</label>
//     <div className="knowledge-base-container">
//       {selectedKnowledgeBases.length > 0 ? (
//         <div className="tags">
//           {selectedKnowledgeBases.map((kb, index) => (
//             <span key={index} className="tag removable-tag">
//               {kb.name}
//               <button
//                 className="remove-tag-btn"
//                 onClick={() => removeKnowledgeBase(kb)}
//                 type="button"
//               >
//                 ✕
//               </button>
//             </span>
//           ))}
//         </div>
//       ) : (
//         <div className="no-selection">No knowledge bases selected</div>
//       )}
//     </div>
//   </div>
// )}
//        <div className="run-btn-container">
//   {loading ? (
//     <button className="run-btn" disabled>
//       Running...
//     </button>
//   ) : (
//     <button className="run-btn" onClick={handleRun}>
//       Run
//     </button>
//   )}
// </div>

//         {/* Error */}
//         {error && <div className="error">Error: {error}</div>}
//       </div>
//     </div>
//   );
// };

// export default AgentSideBar;
// src/components/Agents/AgentSideBar.jsx




// import React, { useState, useEffect, useRef } from "react";
// import "./AgentSideBar.css";
// import { useDispatch, useSelector } from "react-redux";
// import { startRunJob } from "../../../../features/jobs/jobsSlice";
// import HtmlContent from "../htmlContext/HtmlContent";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parse } from "date-fns";

// const AgentSideBar = ({ agentData, jobData, isOpen, onClose }) => {
//   const [companyName, setCompanyName] = useState("");
//   const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const [toggles, setToggles] = useState({
//     isKnowledgebase: false,
//     isInputParams: false,
//     isCategories: false,
//     isModel: false,
//     isAccess: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [currentJobId, setCurrentJobId] = useState(null);
//   const [showResponseView, setShowResponseView] = useState(false);

//   const responseRef = useRef(null);
//   const dispatch = useDispatch();
  
//   // Subscribe to job updates from Redux
//   const jobs = useSelector((state) => state.jobs.entities);
  
//   // Watch for updates to our current job
//   useEffect(() => {
//     if (currentJobId && jobs) {
//       const updatedJob = jobs.find(j => j.id === currentJobId);
//       if (updatedJob) {
//         console.log('Job updated:', updatedJob);
        
//         if (updatedJob.status === 'completed' && updatedJob.responseHtml) {
//           // Job completed - switch to response view
//           setApiResponse(updatedJob.responseHtml);
//           setLoading(false);
//           setShowResponseView(true);
//         } else if (updatedJob.status === 'rejected') {
//           setError(updatedJob.error || 'Job failed');
//           setLoading(false);
//           setShowResponseView(false);
//         } else if (updatedJob.status === 'ongoing') {
//           setLoading(true);
//           setShowResponseView(false);
//         }
//       }
//     }
//   }, [jobs, currentJobId]);

//   // Helper function to parse dates
//   const parseDate = (dateValue) => {
//     if (!dateValue) return null;
    
//     try {
//       // If it's already a Date object
//       if (dateValue instanceof Date) {
//         return dateValue;
//       }
      
//       // Try parsing MM/dd/yyyy format first
//       if (typeof dateValue === 'string') {
//         // Check if it matches MM/dd/yyyy format
//         if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
//           return parse(dateValue, 'MM/dd/yyyy', new Date());
//         }
//         // Try parsing as ISO string
//         const parsed = new Date(dateValue);
//         if (!isNaN(parsed.getTime())) {
//           return parsed;
//         }
//       }
//     } catch (e) {
//       console.error('Error parsing date:', dateValue, e);
//     }
    
//     return null;
//   };

//   const buildSourceAgent = () => {
//     if (jobData) {
//       return {
//         ...jobData,
//         Description: jobData.Description || jobData.description || "",
//         category: jobData.category || jobData.Category || "",
//         modelName: jobData.modelName || jobData.ModelName || "",
//         agentName: jobData.agentName || jobData.AgentName || "",
//         knowledgeBaseData: jobData.knowledgeBaseData || [],
//       };
//     }
//     return agentData || {};
//   };

//   const [sourceAgent, setSourceAgent] = useState({});

//   useEffect(() => {
//     const normalized = buildSourceAgent();
//     setSourceAgent(normalized);

//     if (normalized.knowledgeBaseData) {
//       setSelectedKnowledgeBases([...normalized.knowledgeBaseData]);
//     }

//     setToggles({
//       isKnowledgebase: !!normalized.isKnowledgebase,
//       isInputParams: !!normalized.isInputParams,
//       isCategories: !!normalized.isCategories,
//       isModel: !!normalized.isModel,
//       isAccess: !!normalized.isAccess,
//     });

//     setCompanyName(normalized.companyName || "");

//     // Handle jobData (viewing existing job)
//     if (jobData) {
//       // Parse and set dates from job data
//       const parsedStartDate = parseDate(jobData.startDate);
//       const parsedEndDate = parseDate(jobData.endDate);
      
//       setStartDate(parsedStartDate);
//       setEndDate(parsedEndDate);
      
//       // Set job state based on status
//       if (jobData.status === 'completed' && jobData.responseHtml) {
//         // Immediately show response view for completed jobs
//         setApiResponse(jobData.responseHtml);
//         setError(null);
//         setLoading(false);
//         setShowResponseView(true);
//         setCurrentJobId(null); // Don't need to track anymore
//       } else if (jobData.status === 'ongoing') {
//         setApiResponse(null);
//         setError(null);
//         setLoading(true);
//         setShowResponseView(false);
//         setCurrentJobId(jobData.id); // Track this job for updates
//       } else if (jobData.status === 'rejected') {
//         setApiResponse(null);
//         setError(jobData.error || 'Job failed');
//         setLoading(false);
//         setShowResponseView(false);
//       }
//     } else if (agentData) {
//       // Fresh agent run
//       setApiResponse(null);
//       setError(null);
//       setLoading(false);
//       setCurrentJobId(null);
//       setShowResponseView(false);
      
//       // Check if there are dates in knowledgeBaseData
//       if (agentData.knowledgeBaseData && agentData.knowledgeBaseData.length > 0) {
//         const firstKb = agentData.knowledgeBaseData[0];
//         const parsedStartDate = parseDate(firstKb.StartDate);
//         const parsedEndDate = parseDate(firstKb.EndDate);
        
//         setStartDate(parsedStartDate);
//         setEndDate(parsedEndDate);
//       } else {
//         setStartDate(null);
//         setEndDate(null);
//       }
//     }
//   }, [agentData, jobData]);

//   if (!isOpen) return null;

//   const removeKnowledgeBase = (kbToRemove) => {
//     setSelectedKnowledgeBases((prev) =>
//       prev.filter((kb) => kb.name !== kbToRemove.name)
//     );
//   };

//   const handleRun = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setApiResponse(null);
//       setShowResponseView(false);

//       const formattedStartDate = startDate ? format(startDate, "MM/dd/yyyy") : "";
//       const formattedEndDate = endDate ? format(endDate, "MM/dd/yyyy") : "";

//       const updatedKnowledgeBaseData = (sourceAgent?.knowledgeBaseData || []).map((kb) => ({
//         ...kb,
//         StartDate: formattedStartDate,
//         EndDate: formattedEndDate,
//       }));

//       const enrichedData = {
//         ...sourceAgent,
//         ...toggles,
//         knowledgeBaseData: updatedKnowledgeBaseData,
//         companyName,
//         startDate: formattedStartDate,
//         endDate: formattedEndDate,
//       };

//       // Dispatch and get the job ID
//       const resultAction = await dispatch(startRunJob({ agentData: enrichedData }));
      
//       if (startRunJob.fulfilled.match(resultAction)) {
//         const job = resultAction.payload;
//         setCurrentJobId(job.id);
//         // The useEffect will handle the UI update when job completes
//       } else {
//         setError('Failed to start job');
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error("Error running agent:", err);
//       setError(err.message || "Something went wrong.");
//       setLoading(false);
//     }
//   };

//   const handleDownloadPdf = async () => {
//     if (!responseRef.current) return;
//     try {
//       const html2pdf = (await import("html2pdf.js")).default;

//       const opt = {
//         margin: 10,
//         filename: `${sourceAgent?.agentName || "agent"}-response.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, useCORS: true, windowWidth: responseRef.current.scrollWidth },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       await html2pdf().set(opt).from(responseRef.current).save();
//     } catch (e) {
//       console.error("PDF download failed:", e);
//     }
//   };

//   // Show response view if we have API response OR showResponseView is true
//   if (apiResponse && showResponseView) {
//     return (
//       <div className="sidebar-overlay" onClick={onClose}>
//         <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//           <div className="sidebar-header">
//             <h2>{sourceAgent?.agentName || "Agent"} - Response</h2>
//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <button className="run-btn" onClick={handleDownloadPdf}>
//                 Download PDF
//               </button>
//               <button className="close-btn" onClick={onClose}>✕</button>
//             </div>
//           </div>

//           <div className="sidebar-content" style={{ padding: "20px" }}>
            
            
//             <div ref={responseRef} className="mt-3">
//               <HtmlContent html={apiResponse} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show normal sidebar form
//   return (
//     <div className="sidebar-overlay" onClick={onClose}>
//       <div className="sidebar" onClick={(e) => e.stopPropagation()}>
//         <div className="sidebar-header">
//           <h2>Agent Details</h2>
//           <button className="close-btn" onClick={onClose}>✕</button>
//         </div>

//         <div className="form-group">
//           <label>Agent Name*</label>
//           <input type="text" value={sourceAgent.agentName || ""} readOnly />
//           <p className="description">{sourceAgent.Description || ""}</p>
//         </div>

//         {toggles.isCategories && (
//           <div className="form-group">
//             <label>Category</label>
//             <div className="category-badge">
//               {sourceAgent.category || "No category"}
//             </div>
//           </div>
//         )}

//         <div className="form-group" id="datePicker">
//           <label>Start Date</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             dateFormat="MM/dd/yyyy"
//             className="form-control custom-datepicker"
//             placeholderText="Select start date"
//             disabled={loading || jobData?.status === 'completed'}
//             value={startDate}
//           />
//         </div>

//         <div className="form-group" id="datePicker">
//           <label>End Date</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             dateFormat="MM/dd/yyyy"
//             className="form-control custom-datepicker"
//             placeholderText="Select end date"
//             disabled={loading || jobData?.status === 'completed'}
//             value={endDate}
//           />
//         </div>

//         {toggles.isModel && (
//           <div className="form-group">
//             <label>Model</label>
//             <input type="text" value={sourceAgent.modelName || ""} readOnly />
//           </div>
//         )}

//         {toggles.isInputParams && (
//           <div className="form-group">
//             <label>Company Name*</label>
//             <input
//               type="text"
//               placeholder="Enter company name"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               disabled={loading || jobData?.status === 'completed'}
//             />
//           </div>
//         )}

//         {toggles.isKnowledgebase && (
//           <div className="form-group">
//             <label>Knowledge Base</label>
//             <div className="knowledge-base-container">
//               {selectedKnowledgeBases.length > 0 ? (
//                 <div className="tags">
//                   {selectedKnowledgeBases.map((kb, index) => (
//                     <span key={index} className="tag removable-tag">
//                       {kb.name}
//                       {!loading && jobData?.status !== 'completed' && (
//                         <button
//                           className="remove-tag-btn"
//                           onClick={() => removeKnowledgeBase(kb)}
//                           type="button"
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </span>
//                   ))}
//                 </div>
//                               ) : (
//                 <div className="no-selection">No knowledge bases selected</div>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="run-btn-container">
//           {jobData?.status === 'completed' ? (
//             <div className="status-info">Job completed - Click view to see response</div>
//           ) : loading ? (
//             <button className="run-btn" disabled>
//               Running...
//             </button>
//           ) : (
//             <button className="run-btn" onClick={handleRun}>
//               Run
//             </button>
//           )}
//         </div>

//         {error && <div className="error">Error: {error}</div>}
//       </div>
//     </div>
//   );
// };

// export default AgentSideBar;




import React, { useState, useEffect, useRef } from "react";
import "./AgentSideBar.css";
import { useDispatch, useSelector } from "react-redux";
import { startRunJob } from "../../../../features/jobs/jobsSlice";
import HtmlContent from "../htmlContext/HtmlContent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

const AgentSideBar = ({ agentData, jobData, isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // New state for dynamic inputs
  const [inputRows, setInputRows] = useState([
    {
      id: Date.now(),
      paramName: "companyName",
      paramValue: "",
      additionalParams: []
    }
  ]);

  const [toggles, setToggles] = useState({
    isKnowledgebase: false,
    isInputParams: false,
    isCategories: false,
    isModel: false,
    isAccess: false,
  });

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [showResponseView, setShowResponseView] = useState(false);

  const responseRef = useRef(null);
  const dispatch = useDispatch();
  
  // Subscribe to job updates from Redux
  const jobs = useSelector((state) => state.jobs.entities);
  
  // Watch for updates to our current job
  useEffect(() => {
    if (currentJobId && jobs) {
      const updatedJob = jobs.find(j => j.id === currentJobId);
      if (updatedJob) {
        console.log('Job updated:', updatedJob);
        
        if (updatedJob.status === 'completed' && updatedJob.responseHtml) {
          // Job completed - switch to response view
          setApiResponse(updatedJob.responseHtml);
          setLoading(false);
          setShowResponseView(true);
        } else if (updatedJob.status === 'rejected') {
          setError(updatedJob.error || 'Job failed');
          setLoading(false);
          setShowResponseView(false);
        } else if (updatedJob.status === 'ongoing') {
          setLoading(true);
          setShowResponseView(false);
        }
      }
    }
  }, [jobs, currentJobId]);

  // Helper function to parse dates
  const parseDate = (dateValue) => {
    if (!dateValue) return null;
    
    try {
      // If it's already a Date object
      if (dateValue instanceof Date) {
        return dateValue;
      }
      
      // Try parsing MM/dd/yyyy format first
      if (typeof dateValue === 'string') {
        // Check if it matches MM/dd/yyyy format
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
          return parse(dateValue, 'MM/dd/yyyy', new Date());
        }
        // Try parsing as ISO string
        const parsed = new Date(dateValue);
        if (!isNaN(parsed.getTime())) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing date:', dateValue, e);
    }
    
    return null;
  };

  const buildSourceAgent = () => {
    if (jobData) {
      return {
        ...jobData,
        Description: jobData.Description || jobData.description || "",
        category: jobData.category || jobData.Category || "",
        modelName: jobData.modelName || jobData.ModelName || "",
        agentName: jobData.agentName || jobData.AgentName || "",
        knowledgeBaseData: jobData.knowledgeBaseData || [],
      };
    }
    return agentData || {};
  };

  const [sourceAgent, setSourceAgent] = useState({});

  useEffect(() => {
    const normalized = buildSourceAgent();
    setSourceAgent(normalized);

    if (normalized.knowledgeBaseData) {
      setSelectedKnowledgeBases([...normalized.knowledgeBaseData]);
    }

    setToggles({
      isKnowledgebase: !!normalized.isKnowledgebase,
      isInputParams: !!normalized.isInputParams,
      isCategories: !!normalized.isCategories,
      isModel: !!normalized.isModel,
      isAccess: !!normalized.isAccess,
    });

    setCompanyName(normalized.companyName || "");

    // Handle jobData (viewing existing job)
    if (jobData) {
      // Parse and set dates from job data
      const parsedStartDate = parseDate(jobData.startDate);
      const parsedEndDate = parseDate(jobData.endDate);
      
      setStartDate(parsedStartDate);
      setEndDate(parsedEndDate);
      
      // Set job state based on status
      if (jobData.status === 'completed' && jobData.responseHtml) {
        // Immediately show response view for completed jobs
        setApiResponse(jobData.responseHtml);
        setError(null);
        setLoading(false);
        setShowResponseView(true);
        setCurrentJobId(null); // Don't need to track anymore
      } else if (jobData.status === 'ongoing') {
        setApiResponse(null);
        setError(null);
        setLoading(true);
        setShowResponseView(false);
        setCurrentJobId(jobData.id); // Track this job for updates
      } else if (jobData.status === 'rejected') {
        setApiResponse(null);
        setError(jobData.error || 'Job failed');
        setLoading(false);
        setShowResponseView(false);
      }
    } else if (agentData) {
      // Fresh agent run
      setApiResponse(null);
      setError(null);
      setLoading(false);
      setCurrentJobId(null);
      setShowResponseView(false);
      
      // Check if there are dates in knowledgeBaseData
      if (agentData.knowledgeBaseData && agentData.knowledgeBaseData.length > 0) {
        const firstKb = agentData.knowledgeBaseData[0];
        const parsedStartDate = parseDate(firstKb.StartDate);
        const parsedEndDate = parseDate(firstKb.EndDate);
        
        setStartDate(parsedStartDate);
        setEndDate(parsedEndDate);
      } else {
        setStartDate(null);
        setEndDate(null);
      }
    }
  }, [agentData, jobData]);

  if (!isOpen) return null;

  const removeKnowledgeBase = (kbToRemove) => {
    setSelectedKnowledgeBases((prev) =>
      prev.filter((kb) => kb.name !== kbToRemove.name)
    );
  };

  // New functions for dynamic inputs
  const addInputRow = () => {
    setInputRows([...inputRows, {
      id: Date.now(),
      paramName: "",
      paramValue: "",
      additionalParams: []
    }]);
  };

  const removeInputRow = (rowId) => {
    setInputRows(inputRows.filter(row => row.id !== rowId));
  };

  const updateInputRow = (rowId, field, value) => {
    setInputRows(inputRows.map(row => 
      row.id === rowId ? { ...row, [field]: value } : row
    ));
  };

  const addParameter = (rowId) => {
    setInputRows(inputRows.map(row => 
      row.id === rowId 
        ? { 
            ...row, 
            additionalParams: [...row.additionalParams, {
              id: Date.now(),
              name: "",
              value: ""
            }]
          } 
        : row
    ));
  };

  const removeParameter = (rowId, paramId) => {
    setInputRows(inputRows.map(row => 
      row.id === rowId 
        ? { 
            ...row, 
            additionalParams: row.additionalParams.filter(param => param.id !== paramId)
          } 
        : row
    ));
  };

  const updateParameter = (rowId, paramId, field, value) => {
    setInputRows(inputRows.map(row => 
      row.id === rowId 
        ? { 
            ...row, 
            additionalParams: row.additionalParams.map(param =>
              param.id === paramId ? { ...param, [field]: value } : param
            )
          } 
        : row
    ));
  };

  const handleRun = async () => {
    try {
      setLoading(true);
      setError(null);
      setApiResponse(null);
      setShowResponseView(false);

      const formattedStartDate = startDate ? format(startDate, "MM/dd/yyyy") : "";
      const formattedEndDate = endDate ? format(endDate, "MM/dd/yyyy") : "";

      const updatedKnowledgeBaseData = (sourceAgent?.knowledgeBaseData || []).map((kb) => ({
        ...kb,
        StartDate: formattedStartDate,
        EndDate: formattedEndDate,
      }));

      // Format dynamic inputs
      const formattedCompanyData = inputRows.map(row => {
        const result = {
          [row.paramName]: row.paramValue
        };
        row.additionalParams.forEach(param => {
          if (param.name) {
            result[param.name] = param.value;
          }
        });
        return result;
      });

      const enrichedData = {
        ...sourceAgent,
        ...toggles,
        knowledgeBaseData: updatedKnowledgeBaseData,
        companyName: formattedCompanyData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      // Dispatch and get the job ID
      const resultAction = await dispatch(startRunJob({ agentData: enrichedData }));
      
      if (startRunJob.fulfilled.match(resultAction)) {
        const job = resultAction.payload;
        setCurrentJobId(job.id);
        // The useEffect will handle the UI update when job completes
      } else {
        setError('Failed to start job');
        setLoading(false);
      }
    } catch (err) {
      console.error("Error running agent:", err);
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
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

  // Show response view if we have API response OR showResponseView is true
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
              <button className="close-btn" onClick={onClose}>✕</button>
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

  // Show normal sidebar form
  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>Agent Details</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sidebar-content">
          <div className="form-group">
            <label>Agent Name*</label>
            <input type="text" value={sourceAgent.agentName || ""} readOnly />
            <p className="description">{sourceAgent.Description || ""}</p>
          </div>

          {toggles.isCategories && (
            <div className="form-group">
              <label>Category</label>
              <div className="category-badge">
                {sourceAgent.category || "No category"}
              </div>
            </div>
          )}

          <div className="form-group" id="datePicker">
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              className="form-control custom-datepicker"
              placeholderText="Select start date"
              disabled={loading || jobData?.status === 'completed'}
              value={startDate}
            />
          </div>

          <div className="form-group" id="datePicker">
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              className="form-control custom-datepicker"
              placeholderText="Select end date"
              disabled={loading || jobData?.status === 'completed'}
              value={endDate}
            />
          </div>

          {toggles.isModel && (
            <div className="form-group">
              <label>Model</label>
              <input type="text" value={sourceAgent.modelName || ""} readOnly />
            </div>
          )}

          {toggles.isInputParams && (
            <div className="form-group">
              <div className="input-params-header">
                <label>Input Parameters*</label>
                <button 
                  className="add-circle-btn" 
                  onClick={addInputRow}
                  disabled={loading || jobData?.status === 'completed'}
                  title="Add new input"
                >
                  +
                </button>
              </div>
              
              <div className="dynamic-inputs-container">
                {inputRows.map((row, rowIndex) => (
                  <div key={row.id} className="input-row-container">
                    <div className="input-row-main">
                      <div className="input-row-controls">
                        <input
                          type="text"
                          placeholder="Parameter name"
                          value={row.paramName}
                          onChange={(e) => updateInputRow(row.id, 'paramName', e.target.value)}
                          disabled={loading || jobData?.status === 'completed'}
                          className="param-name-input"
                        />
                        <input
                          type="text"
                          placeholder="Parameter value"
                          value={row.paramValue}
                          onChange={(e) => updateInputRow(row.id, 'paramValue', e.target.value)}
                          disabled={loading || jobData?.status === 'completed'}
                          className="param-value-input"
                        />
                        <button 
                          className="add-circle-btn small" 
                          onClick={() => addParameter(row.id)}
                          disabled={loading || jobData?.status === 'completed'}
                          title="Add parameter"
                        >
                          +
                        </button>
                        {inputRows.length > 1 && (
                          <button 
                            className="remove-circle-btn" 
                            onClick={() => removeInputRow(row.id)}
                            disabled={loading || jobData?.status === 'completed'}
                            title="Remove input"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {row.additionalParams.length > 0 && (
                      <div className="additional-params-container">
                        {row.additionalParams.map((param) => (
                          <div key={param.id} className="additional-param-row">
                            <input
                              type="text"
                              placeholder="Param name"
                              value={param.name}
                              onChange={(e) => updateParameter(row.id, param.id, 'name', e.target.value)}
                              disabled={loading || jobData?.status === 'completed'}
                              className="additional-param-name"
                            />
                            <input
                              type="text"
                              placeholder="Param value"
                              value={param.value}
                              onChange={(e) => updateParameter(row.id, param.id, 'value', e.target.value)}
                              disabled={loading || jobData?.status === 'completed'}
                              className="additional-param-value"
                            />
                            <button 
                              className="remove-circle-btn small" 
                              onClick={() => removeParameter(row.id, param.id)}
                              disabled={loading || jobData?.status === 'completed'}
                              title="Remove parameter"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {toggles.isKnowledgebase && (
            <div className="form-group">
              <label>Knowledge Base</label>
              <div className="knowledge-base-container">
                {selectedKnowledgeBases.length > 0 ? (
                  <div className="tags">
                    {selectedKnowledgeBases.map((kb, index) => (
                      <span key={index} className="tag removable-tag">
                        {kb.name}
                        {!loading && jobData?.status !== 'completed' && (
                          <button
                            className="remove-tag-btn"
                            onClick={() => removeKnowledgeBase(kb)}
                            type="button"
                          >
                            ✕
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="no-selection">No knowledge bases selected</div>
                )}
              </div>
            </div>
          )}

          <div className="run-btn-container">
            {jobData?.status === 'completed' ? (
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
