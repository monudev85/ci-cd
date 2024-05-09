import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ShareMoment = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 34 24"
    {...props}
    height={22}
    width={31.43}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M32.429 6.537v10.926c0 1.345-1.451 2.185-2.612 1.513l-6.885-3.988v1.68c0 3.497-2.826 6.332-6.313 6.332H7.312C3.826 23 1 20.165 1 16.668V7.332C1 3.835 3.826 1 7.312 1h9.307c3.486 0 6.313 2.835 6.313 6.332v1.68l6.885-3.988c1.16-.672 2.612.168 2.612 1.513ZM12 4.667v14.666M19.333 12H4.667"
    />
  </Svg>
)
export default ShareMoment

