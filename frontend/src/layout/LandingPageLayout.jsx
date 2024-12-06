import { Outlet } from "react-router-dom"
import HomeNav from "../components/Navbars/HomeNav"
import Footer from "../components/Footer"

function LandingPageLayout() {
  return (
    <>
      {/* <HomeNav/> */}
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default LandingPageLayout