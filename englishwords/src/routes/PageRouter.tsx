import { Routes, Route } from "react-router"
import Home from "../feature/Home"

const PageRouter: React.FC = () => {
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  )
}

export default PageRouter