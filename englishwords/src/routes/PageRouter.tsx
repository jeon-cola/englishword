import { Routes, Route } from "react-router"
import HomeRouter from "./HomeRouter"
import NavBar from "../feature/NavBar"
import TestRouter from "./TestRouter"
import WordRouter from "./WordRouter"
import TemplateRouter from "./TemplateRouter"
import Authentication from "./AuthenticationRouter"
import MypagesRouter from "./MyPagesRouter"
import { useState } from "react"

// 페이지 라우터 컴포넌트
const PageRouter: React.FC = () => {
  // 로그인 상태 (빈 문자열: 비로그인, 값이 있으면 로그인)
  const [isLogin, setIsLogin] = useState({id: "", nickname: ""})
  return(
    <div>
      < NavBar isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        <Route path="/" element={<HomeRouter/>} />
        <Route path="/test" element={<TestRouter/>} />
        <Route path="/word" element={<WordRouter/>} />
        <Route path="/template" element={<TemplateRouter/>} />
        <Route path="/login" element={<Authentication setIsLogin={setIsLogin}/>} />
        <Route path="/mypages" element={<MypagesRouter isLogin={isLogin} setIsLogin={setIsLogin}/> }/>
      </Routes>
    </div>
  )
}

export default PageRouter