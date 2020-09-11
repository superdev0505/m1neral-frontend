import React from 'react'

export default props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="24"
    fill="none"
    viewBox="0 0 35 24"
    className={props.className}
  >
    <path
      fill={props.color ? props.color : '#000'}
      fillOpacity={props.opacity ? props.opacity : '0.394'}
      fillRule="evenodd"
      d="M23.625 6c0 3.316-2.74 6-6.125 6s-6.125-2.684-6.125-6 2.74-6 6.125-6 6.125 2.684 6.125 6zM8.75 6.857c0 1.891-1.57 3.429-3.5 3.429s-3.5-1.538-3.5-3.429c0-1.89 1.57-3.428 3.5-3.428s3.5 1.537 3.5 3.428zm24.5 0c0 1.891-1.57 3.429-3.5 3.429s-3.5-1.538-3.5-3.429c0-1.89 1.57-3.428 3.5-3.428s3.5 1.537 3.5 3.428zM28 12c-.962 0-1.832.38-2.466.996 2.204 1.184 3.768 3.322 4.107 5.861h3.609c.968 0 1.75-.766 1.75-1.714v-1.714C35 13.537 33.43 12 31.5 12H28zm-6.3 1.714h-.454a8.763 8.763 0 01-3.746.857 8.781 8.781 0 01-3.746-.857H13.3c-3.478 0-6.3 2.765-6.3 6.172v1.543C7 22.849 8.176 24 9.625 24h15.75C26.825 24 28 22.848 28 21.429v-1.543c0-3.407-2.822-6.172-6.3-6.172zM7 12c.963 0 1.832.38 2.466.996-2.203 1.184-3.768 3.322-4.112 5.861H1.75c-.968 0-1.75-.766-1.75-1.714v-1.714C0 13.537 1.57 12 3.5 12H7z"
      clipRule="evenodd"
    ></path>
  </svg>
)