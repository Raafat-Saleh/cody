/** @format */

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./index.css";
import UI from "../ui/UI";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "Too Short!").required("Required"),
  phoneNumber: Yup.string().min(11, "Too Short!").required("required"),
  address: Yup.string().min(4, "Too Short!").required("required"),
  gender: Yup.string().required("required"),
  phoneNumberWhatsApp: Yup.string().min(11, "Too Short!"),
  facebook: Yup.string().min(10, "Too Short!"),
  instagram: Yup.string().min(10, "Too Short!"),
  twitter: Yup.string().min(10, "Too Short!"),
  phoneNumberEmergency1: Yup.string().min(11, "Too Short!"),
  bloodType: Yup.string(),
});

export default function Registration() {
  const [submitCheck, setsubmitCheck] = useState(false);
  const context = useContext(Context);

  let navigate = useNavigate();
  return (
    <div className="backgroundcolor">
      <div className="container">
        <Formik
          initialValues={{
            firstName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            phoneNumberWhatsApp: "",
            facebook: "",
            instagram: "",
            twitter: "",
            phoneNumberEmergency1: "",
            bloodType: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // PASSWORD
            context.setUser(values);
            navigate(`/users/${1}`);
          }}
        >
          {({ errors, values }) => (
            <Form className="well form-horizontal form">
              <legend className="profile-card__name">Personal Info</legend>
              <UI
                name={"firstName"}
                errors={errors.firstName}
                submitCheck={submitCheck}
                label={"Name"}
                i={"glyphicon glyphicon-user"}
                placeholder={"Name"}
                type={"text"}
                value={values.firstName}
                maxlength={15}
              />
              <UI
                name={"address"}
                errors={errors.address}
                value={values.address}
                submitCheck={submitCheck}
                label={"Address"}
                i={"glyphicon glyphicon-home"}
                placeholder={"address"}
                type={"text"}
                maxlength={30}
              />
              <UI
                name={"phoneNumber"}
                errors={errors.phoneNumber}
                submitCheck={submitCheck}
                label={"Phone"}
                i={"glyphicon glyphicon-earphone"}
                placeholder={"phone"}
                type={"tel"}
                value={values.phoneNumber}
                maxlength={11}
              />

              <div className="form-group">
                <label className="col-md-4 control-label">Gender</label>
                <div className="col-md-4">
                  <div className="radio">
                    <label>
                      <Field type="radio" name="gender" value="male" /> Male
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <Field type="radio" name="gender" value="female" /> Female
                    </label>
                  </div>
                </div>
              </div>
              <legend className="profile-card__name"> Social</legend>

              <UI
                name={"phoneNumberWhatsApp"}
                errors={errors.phoneNumberWhatsApp}
                submitCheck={submitCheck}
                label={"WhatsApp"}
                i={"fab fa-whatsapp"}
                placeholder={"WhatsApp Number"}
                type={"tel"}
                value={values.phoneNumberWhatsApp}
                maxlength={11}
              />
              <UI
                name={"facebook"}
                errors={errors.facebook}
                value={values.facebook}
                submitCheck={submitCheck}
                label={"Facebook"}
                i={"fa-brands fa-facebook-f"}
                placeholder={"facebook link"}
                type={"text"}
              />
              <UI
                name={"instagram"}
                errors={errors.instagram}
                value={values.instagram}
                submitCheck={submitCheck}
                label={"Instagram"}
                i={"fa-brands fa-instagram"}
                placeholder={"instagram link"}
                type={"text"}
              />
              <UI
                name={"twitter"}
                errors={errors.twitter}
                value={values.twitter}
                submitCheck={submitCheck}
                label={"Twitter"}
                i={"fa-brands fa-twitter"}
                placeholder={"twitter link"}
                type={"text"}
              />
              <legend className="profile-card__name">Emergency</legend>

              <div className="form-group">
                <label className="col-md-4 control-label ">Blood Type</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa-solid fa-droplet "></i>
                    </span>
                    <Field
                      component="select"
                      name="bloodType"
                      className="form-control selectpicker "
                      multiple={false}
                    >
                      <option value="">your BloodType</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </Field>
                  </div>
                </div>
              </div>
              <UI
                name={"phoneNumberEmergency1"}
                errors={errors.phoneNumberEmergency1}
                submitCheck={submitCheck}
                label={"Phone For Emergency"}
                i={"glyphicon glyphicon-earphone"}
                placeholder={"Phone For Emergency"}
                type={"tel"}
                value={values.phoneNumberEmergency1}
                maxlength={11}
              />

              <div className="form-group text-right">
                <label className="col-md-4 control-label"></label>
                <div className="col-md-4">
                  <button
                    type="submit"
                    className="profile-card__button button--orange"
                    onClick={() => setsubmitCheck(true)}
                  >
                    Submit <span className="glyphicon glyphicon-send"></span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
