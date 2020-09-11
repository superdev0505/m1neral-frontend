import React, { useEffect } from "react";
import { AppContext } from "../../../AppContext";

const main_div = {
  textAlign: "center",
  padding: "1.5vh",
};
const big_text = {
  fontSize: "55px",
  fontWeight: "bold",
  color: "#504D4D",
};
const big_grey_text = {
  fontSize: "22px",
  color: "grey",
};
const text_grey = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "grey",
  paddingBottom: "4vh",
};
const notification_div = {
  background: "#ecf2f9",
  borderRadius: "10px",
  width: "70vh",
  margin: "0vh auto",
};
const padding_div_top = {
  paddingTop: "4vh",
};
const padding_div_2 = {
  paddingTop: "2vh",
};
const image_style = {
  height: "calc(100vh - 65vh)",
};
export default function BulkUpload(props) {
  const [stateApp, setStateApp] = React.useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <div style={main_div}>
      <div style={{ ...big_text, ...padding_div_top }}>
        Sit tight as this may take a bit.
      </div>
      <div style={{ ...big_grey_text, ...padding_div_2 }}>
        Our robots are working their magic to quickly upload your contacts.
      </div>
      <div style={{ ...padding_div_top }}>
        <img style={image_style} src="img/M1neral Robot.svg"></img>
      </div>
      <div style={notification_div}>
        <div style={{ ...text_grey, ...padding_div_top }}>
          We will send an in-app notification once your contacts are uploaded.
        </div>
      </div>
    </div>
  );
}
