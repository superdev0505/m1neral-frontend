import React from "react";

export default (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 430 430"
    width={props.size ? props.size : "25"}
    height={props.size ? props.size : "30"}
    className={props.className}
  >
    <path
      fill={props.color ? props.color : "#000"}
      d="M290.819,142.003h-32.65v-40.27h-32.494V77.154c15.978-0.313,31.964-1.315,47.998-3.03
			c17.703-10.063,17.701-17.105,0-27.167c-16.034-1.716-32.021-2.716-47.998-3.029v-7.547h-21.35v7.547
			c-15.977,0.313-31.964,1.313-47.998,3.029c-17.702,10.062-17.702,17.104,0,27.167c16.034,1.715,32.021,2.718,47.998,3.03v24.579
			h-32.494v40.27h-32.65v23.383h151.638V142.003L290.819,142.003z M192.216,122.119h45.567v19.885h-45.567V122.119L192.216,122.119z
			"
    />
    <path
      fill={props.color ? props.color : "#000"}
      d="M357.962,276.374h-67.535c-10.01-0.209-18.092-8.402-18.092-18.462V231.61c0-10.195,8.291-18.486,18.483-18.486v-2.967
			v-9.021v-14.362H139.181v14.362v9.021v2.967c10.192,0,18.483,8.291,18.483,18.486v26.302c0,10.06-8.082,18.253-18.092,18.462
			H72.037V260.52h-25.3v133.098h25.3v-16.186h285.925v16.186h25.3V260.52h-25.3V276.374L357.962,276.374z"
    />
  </svg>
);
