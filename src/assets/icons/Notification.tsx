import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Notification = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 24"
    height={22.2}
    width={19.2}
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.66 21.737a3.397 3.397 0 0 0 4.717.555c.216-.16.41-.347.577-.555M1 13.966v-.241a3.96 3.96 0 0 1 .662-2A5.358 5.358 0 0 0 2.975 9.18c0-.734 0-1.477.064-2.21C3.37 3.44 6.86 1 10.307 1h.085c3.448 0 6.938 2.44 7.28 5.97.063.733 0 1.476.052 2.21.2.95.653 1.832 1.313 2.555.401.592.63 1.28.662 1.99v.23a3.923 3.923 0 0 1-.929 2.63 4.956 4.956 0 0 1-3.137 1.507 49.592 49.592 0 0 1-10.577 0 5.01 5.01 0 0 1-3.137-1.508A3.964 3.964 0 0 1 1 13.966Z"
    />
  </Svg>
)
export default Notification
