import * as React from "react"
const SvgComponent = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <circle
      cx={12.5}
      cy={12.5}
      r={11.5}
      stroke="#000"
      strokeWidth={2}
      transform="matrix(1 0 0 -1 0 25)"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="M7.143 12.5h10.491M12.389 7.254v10.491"
    />
  </svg>
)
export default SvgComponent
