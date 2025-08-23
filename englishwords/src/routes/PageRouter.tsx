import { Routes, Route } from "react-router"
import HomeRouter from "./HomeRouter"
import NavBar from "../feature/NavBar"

const PageRouter: React.FC = () => {
  return(
    <div>
      < NavBar/>
      <Routes>
        <Route path="/" element={<HomeRouter/>} />
      </Routes>
    </div>
  )
}

export default PageRouter