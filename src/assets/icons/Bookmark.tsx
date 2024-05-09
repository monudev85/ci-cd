import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Bookmark = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 24"
    height={24}
    width={16.8}
    {...props}
  >
    <Path
      fill="#000"
      d="M13.197 0H3.6A3.6 3.6 0 0 0 0 3.6v19.195a1.2 1.2 0 0 0 1.8 1.044l6.598-3.815 6.599 3.815a1.2 1.2 0 0 0 .6.156 1.2 1.2 0 0 0 .6-.156 1.2 1.2 0 0 0 .6-1.043V3.599A3.6 3.6 0 0 0 13.197 0Zm1.2 20.72L8.998 17.6a1.2 1.2 0 0 0-1.2 0L2.4 20.72V3.6a1.2 1.2 0 0 1 1.2-1.2h9.597a1.2 1.2 0 0 1 1.2 1.2v17.12Z"
    />
  </Svg>
)
export default Bookmark

