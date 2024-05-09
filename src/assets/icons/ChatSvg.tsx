import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ChatSvg = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.167 13.466a.47.47 0 0 1-.472-.466.47.47 0 0 1 .472-.466"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.166 13.466A.47.47 0 0 0 13.64 13a.47.47 0 0 0-.473-.466M7.974 13.466A.469.469 0 0 1 7.502 13c0-.258.211-.466.472-.466M7.974 13.466c.26 0 .472-.209.472-.466a.469.469 0 0 0-.472-.466M18.36 13.466a.47.47 0 0 1-.473-.466.47.47 0 0 1 .472-.466"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.36 13.466A.47.47 0 0 0 18.83 13a.47.47 0 0 0-.472-.466"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.16 1c-2.2 0-4.358.59-6.245 1.705a12.07 12.07 0 0 0-4.47 4.629 11.87 11.87 0 0 0 .594 12.312L1 25l6.828-1.218A12.292 12.292 0 0 0 13.107 25c1.83.009 3.638-.39 5.29-1.167a12.132 12.132 0 0 0 4.25-3.32 11.932 11.932 0 0 0 2.367-4.813c.412-1.76.416-3.588.012-5.35a11.936 11.936 0 0 0-2.345-4.823 12.134 12.134 0 0 0-4.236-3.338A12.294 12.294 0 0 0 13.159 1Z"
    />
  </Svg>
)
export default ChatSvg
