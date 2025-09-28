import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";

/**
 * Props:
 * - inputValueData: array from API (each object contains Display Name, Control Type, IsMultivalue Allowed, Is Required, Default Value)
 * - onChange(updatedInputValueData, isValid) => parent callback
 * - disabled (optional) => disable inputs
 *
 * Behavior:
 * - If Default Value === "None" => field editable by user.
 * - If Default Value !== "None" => show default in input and make readOnly.
 * - MultiSelect with default None => user can enter comma-separated values in one textbox.
 * - Date control: Default Value split by "|" => start|end; if default present then both date pickers readOnly and show parsed dates.
 * - Validation: required fields must have value (or default not None).
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
      // For Date: we will keep parsed date objects for easier react-datepicker usage
      if (controlType === "Date") {
        if (df && df !== "None" && df.includes("|")) {
          const [startStr, endStr] = df.split("|").map((s) => s.trim());
          const start = parseDateString(startStr);
          const end = parseDateString(endStr);
          return {
            ...field,
            _value: df, // keep original Default Value string
            _startDate: start,
            _endDate: end,
            _isReadOnly: df !== "None",
          };
        } else {
          return {
            ...field,
            _value: "None",
            _startDate: null,
            _endDate: null,
            _isReadOnly: false,
          };
        }
      } else {
        // For text / multiselect
        return {
          ...field,
          _value: df,
          _isReadOnly: df !== "None",
        };
      }
    });
    setLocalData(normalized);
  }, [inputValueData]);

  // Whenever localData changes, compute updatedInputValueData and validation, and call onChange
  useEffect(() => {
    if (!localData) return;
    // Build updated JSON array (keeping same keys, but replacing Default Value where needed)
    const updated = localData.map((field) => {
      const controlType = field["Control Type"] ?? "FreeTextBox";
      const copy = { ...field };

      if (controlType === "Date") {
        // If default was not "None", keep as original _value (string)
        if (field._isReadOnly && field._value && field._value !== "None") {
          copy["Default Value"] = field._value;
        } else {
          // If user set start/end, format as "01-Jan-2025|30-Sep-2025"
          const start = field._startDate ? formatDateString(field._startDate) : "";
          const end = field._endDate ? formatDateString(field._endDate) : "";
          copy["Default Value"] = start || end ? `${start}|${end}` : "None";
        }

        // remove internal keys
        delete copy._startDate;
        delete copy._endDate;
        delete copy._value;
        delete copy._isReadOnly;
      } else {
        // Text / MultiSelect
        if (field._isReadOnly && field._value && field._value !== "None") {
          copy["Default Value"] = field._value;
        } else {
          // user-supplied value (single value or comma-separated)
          copy["Default Value"] = field._value && field._value !== "" ? field._value : "None";
        }
        delete copy._value;
        delete copy._isReadOnly;
      }

      return copy;
    });

    // Validate required fields
    let isValid = true;
    for (const f of localData) {
      const required = !!f["Is Required"];
      if (!required) continue;

      const controlType = f["Control Type"] ?? "FreeTextBox";
      if (controlType === "Date") {
        // required: both start and end must be present (or default not None)
        if (f._isReadOnly) {
          if (!f._value || f._value === "None") isValid = false;
        } else {
          if (!f._startDate || !f._endDate) isValid = false;
        }
      } else {
        if (f._isReadOnly) {
          if (!f._value || f._value === "None") isValid = false;
        } else {
          if (!f._value || (typeof f._value === "string" && f._value.trim() === "")) isValid = false;
          // if multivalue allowed false but user entered commas, still accept; validation only checks present
        }
      }
    }

    // call parent
    if (typeof onChange === "function") {
      onChange(updated, isValid);
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
    const defaultVal = field._value === undefined ? "None" : field._value;

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
                // When readOnly we still show value
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

          {/* {readOnly && defaultVal && defaultVal !== "None" && (
            <div className="field-note">Fixed: {defaultVal}</div>
          )} */}
        </div>
      );
    }

    // FreeTextBox or MultiSelect (we use one textbox; multivalue = comma-separated allowed)
    return (
      <div key={idx} className="form-row">
        <label>
          {displayName} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <input
          type="text"
          placeholder={
            readOnly
              ? defaultVal && defaultVal !== "None"
                ? defaultVal
                : ""
              : isMulti
              ? "Enter comma separated values"
              : ""
          }
          value={field._isReadOnly ? (field._value === "None" ? "" : field._value) : field._value || ""}
          onChange={(e) => handleTextChange(idx, e.target.value)}
          readOnly={readOnly || disabled}
          disabled={readOnly || disabled}
        />
        {/* {readOnly && defaultVal && defaultVal !== "None" && (
          <div className="field-note">Fixed: {defaultVal}</div>
        )} */}
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
