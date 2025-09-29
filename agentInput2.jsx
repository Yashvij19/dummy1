import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";

/**
 * Props:
 * - inputValueData: array from API (each object contains Display Name, Control Type, IsMultivalue Allowed, Is Required, Default Value, IsEditable)
 * - onChange(filterValue, isValid) => parent callback - now sends filterValue format instead of inputValueData
 * - disabled (optional) => disable inputs
 *
 * New Behavior:
 * - IsEditable controls whether field is editable (not Default Value logic)
 * - Default Value is used as placeholder/initial value, can be comma-separated for multivalue
 * - Multivalue fields handle comma-separated values as arrays in filterValue
 * - Returns filterValue format: { "Display Name": value/array, "startDate": date, "endDate": date }
 */

const DATE_PARSE_FORMAT = "dd-MMM-yyyy"; // e.g. 01-Jan-2025

const parseDateString = (str) => {
  try {
    if (!str) return null;
    const d = parse(str, DATE_PARSE_FORMAT, new Date());
    return isNaN(d.getTime()) ? null : d;
  } catch (e) {
    return null;
  }
};

const formatDateString = (date) => {
  if (!date) return "";
  try {
    return format(date, DATE_PARSE_FORMAT);
  } catch {
    return "";
  }
};

const agentInput = ({ inputValueData = [], onChange, disabled = false }) => {
  // local state mirrors inputValueData but with runtime-editable values
  const [localData, setLocalData] = useState([]);

  // initialize localData from props
  useEffect(() => {
    const normalized = (inputValueData || []).map((field) => {
      const df = field["Default Value"] ?? "None";
      const controlType = field["Control Type"] ?? "FreeTextBox";
      const isEditable = field["IsEditable"] ?? true;
      const isMultivalue = field["IsMultivalue Allowed"] ?? false;
      
      // For Date: we will keep parsed date objects for easier react-datepicker usage
      if (controlType === "Date") {
        if (df && df !== "None" && df.includes("|")) {
          const [startStr, endStr] = df.split("|").map((s) => s.trim());
          const start = parseDateString(startStr);
          const end = parseDateString(endStr);
          return {
            ...field,
            _defaultValue: df,
            _startDate: start,
            _endDate: end,
            _isReadOnly: !isEditable,
          };
        } else {
          return {
            ...field,
            _defaultValue: df,
            _startDate: null,
            _endDate: null,
            _isReadOnly: !isEditable,
          };
        }
      } else {
        // For text / multiselect - initialize with default value if present
        let initialValue = "";
        if (df && df !== "None") {
          if (isMultivalue) {
            // For multivalue, convert comma-separated default to display string
            initialValue = df;
          } else {
            initialValue = df;
          }
        }
        
        return {
          ...field,
          _defaultValue: df,
          _value: initialValue,
          _isReadOnly: !isEditable,
        };
      }
    });
    setLocalData(normalized);
  }, [inputValueData]);

  // Whenever localData changes, compute filterValue and validation, and call onChange
  useEffect(() => {
    if (!localData || localData.length === 0) return;
    
    // Build filterValue object
    const filterValue = {};
    
    localData.forEach((field) => {
      const displayName = field["Display Name"];
      const controlType = field["Control Type"] ?? "FreeTextBox";
      const isMultivalue = field["IsMultivalue Allowed"] ?? false;
      
      if (controlType === "Date") {
        // For dates, add startDate and endDate keys
        filterValue["startDate"] = field._startDate ? formatDateString(field._startDate) : "";
        filterValue["endDate"] = field._endDate ? formatDateString(field._endDate) : "";
      } else {
        // Text / MultiSelect
        let value = field._value || "";
        
        // Handle multivalue conversion to array
        if (isMultivalue && value && value.trim() !== "") {
          filterValue[displayName] = value.split(",").map(v => v.trim()).filter(v => v !== "");
        } else {
          filterValue[displayName] = value;
        }
      }
    });

    // Validate required fields
    let isValid = true;
    for (const field of localData) {
      const required = !!field["Is Required"];
      if (!required) continue;

      const controlType = field["Control Type"] ?? "FreeTextBox";
      const displayName = field["Display Name"];
      
      if (controlType === "Date") {
        // required: both start and end must be present
        if (!filterValue["startDate"] || !filterValue["endDate"]) {
          isValid = false;
          break;
        }
      } else {
        const value = filterValue[displayName];
        if (!value || (typeof value === "string" && value.trim() === "") || 
            (Array.isArray(value) && value.length === 0)) {
          isValid = false;
          break;
        }
      }
    }

    // call parent with filterValue format
    if (typeof onChange === "function") {
      onChange(filterValue, isValid);
    }
  }, [localData, onChange]);

  // Handlers
  const handleTextChange = (idx, val) => {
    setLocalData((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], _value: val };
      return copy;
    });
  };

  const handleDateChange = (idx, which, dateObj) => {
    setLocalData((prev) => {
      const copy = [...prev];
      if (which === "start") {
        copy[idx] = { ...copy[idx], _startDate: dateObj };
      } else {
        copy[idx] = { ...copy[idx], _endDate: dateObj };
      }
      return copy;
    });
  };

  // UI render helpers
  const renderField = (field, idx) => {
    const displayName = field["Display Name"] || `field-${idx}`;
    const controlType = field["Control Type"] || "FreeTextBox";
    const isMulti = !!field["IsMultivalue Allowed"];
    const isRequired = !!field["Is Required"];
    const readOnly = !!field._isReadOnly;
    const defaultVal = field._defaultValue === undefined ? "None" : field._defaultValue;

    if (controlType === "Date") {
      // For date we use start and end date pickers
      const start = field._startDate || null;
      const end = field._endDate || null;
      return (
        <div key={idx} className="form-row">
          <label>
            {displayName} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>Start</small>
              <DatePicker
                selected={start}
                onChange={(d) => handleDateChange(idx, "start", d)}
                dateFormat="dd-MMM-yyyy"
                placeholderText="Start date"
                readOnly={readOnly || disabled}
                disabled={readOnly || disabled}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>End</small>
              <DatePicker
                selected={end}
                onChange={(d) => handleDateChange(idx, "end", d)}
                dateFormat="dd-MMM-yyyy"
                placeholderText="End date"
                readOnly={readOnly || disabled}
                disabled={readOnly || disabled}
              />
            </div>
          </div>
        </div>
      );
    }

    // FreeTextBox or MultiSelect
    const placeholderText = defaultVal && defaultVal !== "None" ? defaultVal : 
                            isMulti ? "Enter comma separated values" : "";
    
    return (
      <div key={idx} className="form-row">
        <label>
          {displayName} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <input
          type="text"
          placeholder={placeholderText}
          value={field._value || ""}
          onChange={(e) => handleTextChange(idx, e.target.value)}
          readOnly={readOnly || disabled}
          disabled={readOnly || disabled}
        />
      </div>
    );
  };

  return (
    <div className="agent-input-container">
      {localData.length === 0 ? (
        <div className="no-inputs">No inputs configured</div>
      ) : (
        localData.map((f, idx) => renderField(f, idx))
      )}
    </div>
  );
};

export default agentInput;
