import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ThreeDot = (props:any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={4} height={18} fill="none" {...props}>
    <Path
      fill="#000"
      d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
    />
  </Svg>
)
export default ThreeDot