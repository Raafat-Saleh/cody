/** @format */

import React from "react";
import "./UI.css";
import { Field } from "formik";
export default function UI({
  errors,
  submitCheck,
  label,
  i,
  name,
  placeholder,
  type,
  value,
  maxlength,
  accept,
}) {
  return (
    <div
      className={`form-group ${
        submitCheck && value ? (errors ? "ColorError" : "ColorOk") : ""
      }`}
    >
      <label className="col-md-4 control-label">{label}</label>
      <div className="col-md-4 inputGroupContainer">
        <div className="input-group">
          <span
            className={`input-group-addon ${
              submitCheck && value ? (errors ? "ColorError" : "ColorOk") : ""
            }`}
          >
            <i className={i}></i>
          </span>
          <Field
            name={name}
            maxLength={maxlength}
            placeholder={placeholder}
            className={`form-control ${
              submitCheck && value
                ? errors
                  ? "inputBorderColorError"
                  : "inputBorderColorOk"
                : ""
            }`}
            type={type}
            accept={accept}
          />
        </div>
        <div className="error_ok_position">
          {submitCheck && value ? (
            errors ? (
              <i className="glyphicon glyphicon-remove"></i>
            ) : (
              <i className="glyphicon glyphicon-ok"></i>
            )
          ) : (
            ""
          )}
        </div>
        {errors && submitCheck && value ? <div>{errors}</div> : null}
      </div>
    </div>
  );
}
