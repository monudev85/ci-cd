import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Comment = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={24}
    width={24.33}
    viewBox="0 0 27 26"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.167 1c2.2 0 4.357.59 6.244 1.705a12.07 12.07 0 0 1 4.47 4.629 11.87 11.87 0 0 1-.594 12.312L25.327 25l-6.829-1.218a12.292 12.292 0 0 1-10.569.051 12.132 12.132 0 0 1-4.25-3.32A11.932 11.932 0 0 1 1.311 15.7a11.845 11.845 0 0 1-.012-5.35 11.935 11.935 0 0 1 2.345-4.823A12.134 12.134 0 0 1 7.881 2.19 12.294 12.294 0 0 1 13.167 1Z"
    />
  </Svg>
)
export default Comment
