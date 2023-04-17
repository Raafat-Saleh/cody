/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

import { Context } from "../../context/Context";
import Loading from "../loading/Loading";

import { uid } from "uid";
import { getDatabase, ref, set, get, child } from "firebase/database";

export default function Profile() {
  const context = useContext(Context);
  const [show, setshow] = useState(true);
  const [loading, setloading] = useState(true);
  const [looding, setlooding] = useState(false);

  const [QrCode, setQrCode] = useState("");
  const [data_id, setdata_id] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumberWhatsApp, setWhatsApp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [phoneNumberEmergency1, setEmergency] = useState("");
  const [bloodType, setBlood] = useState("");

  useEffect(() => {
    if (!context.user.firstName) {
      setloading(true);
      setshow(false);
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setName(snapshot.val().name);
            setAddress(snapshot.val().address);
            setPhone(snapshot.val().phone);
            setGender(snapshot.val().gender);
            setWhatsApp(snapshot.val().phoneNumberWhatsApp);
            setFacebook(snapshot.val().facebook);
            setInstagram(snapshot.val().instagram);
            setTwitter(snapshot.val().twitter);
            setEmergency(snapshot.val().phoneNumberEmergency1);
            setBlood(snapshot.val().bloodType);
            setloading(false);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setName(context.user.firstName);
      setPhone(context.user.phoneNumber);
      setAddress(context.user.address);
      setGender(context.user.gender);
      setWhatsApp(context.user.phoneNumberWhatsApp);
      setFacebook(context.user.facebook);
      setInstagram(context.user.instagram);
      setTwitter(context.user.twitter);
      setEmergency(context.user.phoneNumberEmergency1);
      setBlood(context.user.bloodType);
      setloading(false);
    }
  }, [bloodType]);

  const userId = uid(25);
  function MakeQR() {
    setlooding(true);
    const db = getDatabase();
    const reference = ref(db, "users/" + userId);
    set(reference, {
      name: name,
      address: address,
      phone: phone,
      gender: gender,
      phoneNumberWhatsApp: phoneNumberWhatsApp,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      bloodType: bloodType,
      phoneNumberEmergency1: phoneNumberEmergency1,
    });
    setlooding(false);
    setdata_id(userId);

    //make QR
    QRCode.toDataURL(`https://cody-net.firebaseapp.com/users/${userId}`, {
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
