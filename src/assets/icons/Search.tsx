import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Search = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={21.48}
    width={22}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M11.287 21.575c5.682 0 10.287-4.606 10.287-10.288C21.575 5.606 16.97 1 11.287 1 5.606 1 1 5.606 1 11.287c0 5.682 4.606 10.287 10.287 10.287ZM18.444 18.977 22.477 23"
    />
  </Svg>
)
export default Search
