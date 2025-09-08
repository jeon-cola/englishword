import { Routes, Route } from "react-router"
import HomeRouter from "./HomeRouter"
import NavBar from "../feature/NavBar"
import TestRouter from "./TestRouter"
import WordRouter from "./WordRouter"
import TemplateRouter from "./TemplateRouter"
import Authentication from "./AuthenticationRouter"
import { useState } from "react"

const PageRouter: React.FC = () => {
  const [isLogin, setIsLogin] = useState("")
  return(
    <div>
      < NavBar isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        <Route path="/" element={<HomeRouter/>} />
        <Route path="/test" element={<TestRouter/>} />
        <Route path="/word" element={<WordRouter/>} />
        <Route path="/template" element={<TemplateRouter/>} />
        <Route path="/login" element={<Authentication setIsLogin={setIsLogin}/>} />
      </Routes>
    </div>
  )
}

export default PageRouter