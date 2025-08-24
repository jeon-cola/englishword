import { Routes, Route } from "react-router"
import HomeRouter from "./HomeRouter"
import NavBar from "../feature/NavBar"
import TestRouter from "./TestRouter"
import WordRouter from "./WordRouter"
import TemplateRouter from "./TemplateRouter"

const PageRouter: React.FC = () => {
  return(
    <div>
      < NavBar/>
      <Routes>
        <Route path="/" element={<HomeRouter/>} />
        <Route path="/test" element={<TestRouter/>} />
        <Route path="/word" element={<WordRouter/>} />
        <Route path="/template" element={<TemplateRouter/>} />
      </Routes>
    </div>
  )
}

export default PageRouter