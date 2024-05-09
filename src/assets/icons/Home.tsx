import * as React from "react"
import Svg, { Path } from "react-native-svg"
const HomeSvg = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={24}
    width={23.1}
    viewBox="0 0 26 26"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.094 23.526v-3.68c0-.936.773-1.697 1.73-1.703h3.51c.962 0 1.742.762 1.742 1.703v3.691c0 .795.65 1.444 1.462 1.463h2.34c2.332 0 4.222-1.847 4.222-4.126V10.405a2.915 2.915 0 0 0-1.17-2.285l-8-6.298a3.907 3.907 0 0 0-4.795 0L2.17 8.132A2.892 2.892 0 0 0 1 10.416v10.457C1 23.153 2.89 25 5.222 25h2.34c.833 0 1.508-.66 1.508-1.474"
    />
  </Svg>
)
export default HomeSvg