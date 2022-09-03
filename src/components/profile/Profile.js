/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

import { Context } from "../../context/Context";
import Loading from "../loading/Loading";
export default function Profile() {
  const context = useContext(Context);
  const [show, setshow] = useState(true);
  const [loading, setloading] = useState(false);
  const [looding, setlooding] = useState(false);
  const [QrCode, setQrCode] = useState("");
  const [data_id, setdata_id] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  var name = context.user.firstName;
  var phone = context.user.phoneNumber;
  var address = context.user.address;
  var gender = context.user.gender;
  //
  var phoneNumberWhatsApp = context.user.phoneNumberWhatsApp;
  var facebook = context.user.facebook;
  var instagram = context.user.instagram;
  var twitter = context.user.twitter;
  var phoneNumberEmergency1 = context.user.phoneNumberEmergency1;
  var bloodType = context.user.bloodType;
  useEffect(() => {
    if (!context.user.firstName) {
      setloading(true);
      setshow(false);
      fetch(`https://rafat-qr-users.herokuapp.com/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          data.firstName ? setloading(false) : setloading(true);
          context.setUser(data);
          name = context.user.firstName;
          phone = context.user.phoneNumber;
          address = context.user.address;
          gender = context.user.gender;
          phoneNumberWhatsApp = context.user.phoneNumberWhatsApp;
          facebook = context.user.facebook;
          instagram = context.user.instagram;
          twitter = context.user.twitter;
          phoneNumberEmergency1 = context.user.phoneNumberEmergency1;
          bloodType = context.user.bloodType;
        });
    }
  }, []);

  function MakeQR() {
    setlooding(true);
    fetch("https://rafat-qr-users.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(context.user),
      headers: { "Content-type": "application/json " },
    })
      .then((response) => response.json())
      .then((data) => {
        setlooding(false);
        setdata_id(data._id);
        //make QR
        QRCode.toDataURL(`https://cody-net.firebaseapp.com/users/${data._id}`, {
          color: {
            dark: "#00F", // dots
            light: "#FFF", // background
          },
          // scale: 8,
        })
          .then((url) => {
            setQrCode(url);
          })
          .catch((err) => {});
      });
  }

  return (
    <div>
      <div className="wrapper">
        {loading && <Loading />}
        {!loading && (
          <div className="profile-card js-profile-card">
            <div className="profile-card__img">
              {gender === "male" && (
                <img src="/images/male/4.jpg" alt="profile card" />
              )}
              {gender === "female" && (
                <img src="/images/2.png" alt="profile card" />
              )}
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">{name}</div>
              <div className="profile-card-loc">
                <span className="profile-card-loc__icon">
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>

                <span className="profile-card-loc__txt">{address}</span>
              </div>

              <div className="profile-card-social">
                <a
                  href={`tel:${phone}`}
                  className="profile-card-social__item phone"
                  target="_blank"
                >
                  <span className="icon-font">
                    <i className="icon fa-solid fa-phone"></i>
                  </span>
                </a>
                {facebook && (
                  <a
                    href={facebook}
                    className="profile-card-social__item facebook"
                    target="_blank"
                  >
                    <span className="icon-font">
                      <i className="icon fa-brands fa-facebook-f"></i>
                    </span>
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    className="profile-card-social__item instagram"
                    target="_blank"
                  >
                    <span className="icon-font">
                      <i className="icon fa-brands fa-instagram"></i>
                    </span>
                  </a>
                )}
                {twitter && (
                  <a
                    href={twitter}
                    className="profile-card-social__item twitter"
                    target="_blank"
                  >
                    <span className="icon-font">
                      <i className=" icon fa-brands fa-twitter"></i>
                    </span>
                  </a>
                )}
                {phoneNumberWhatsApp && (
                  <a
                    href={`tel:${phoneNumberWhatsApp}`}
                    className="profile-card-social__item whatsapp"
                    target="_blank"
                  >
                    <span className="icon-font">
                      <i className="icon fa-brands fa-whatsapp"></i>
                    </span>
                  </a>
                )}

                {bloodType && (
                  <a className="profile-card-social__item link">
                    <span className="icon-font">
                      <strong>{bloodType}</strong>
                    </span>
                  </a>
                )}
                {phoneNumberEmergency1 && (
                  <a
                    href={`tel:${phoneNumberEmergency1}`}
                    className="profile-card-social__item codepen"
                    target="_blank"
                  >
                    <span className="icon-font">
                      <i className="icon fa-solid fa-hand-holding-medical"></i>
                    </span>
                  </a>
                )}
              </div>

              {show && (
                <div className="profile-card-ctr">
                  {!QrCode && (
                    <button
                      className="profile-card__button button--orange"
                      onClick={() => navigate("/", { replace: true })}
                    >
                      {!QrCode ? "Cancel" : "Back"}
                    </button>
                  )}
                  {!QrCode && (
                    <button
                      disabled={looding}
                      className="profile-card__button button--blue js-message-btn"
                      onClick={() => MakeQR()}
                    >
                      {looding ? "loading" : "Make QR"}
                    </button>
                  )}
                  {QrCode && (
                    <a href={QrCode} download="CodY.png">
                      <button
                        className="profile-card__button button--blue js-message-btn"
                        onClick={() =>
                          navigate(`/users/${data_id}`, { replace: true })
                        }
                      >
                        Download
                      </button>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
