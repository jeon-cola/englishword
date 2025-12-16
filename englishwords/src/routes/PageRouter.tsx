import { Routes, Route } from "react-router"
import HomeRouter from "./HomeRouter"
import NavBar from "../feature/NavBar"
import TestRouter from "./TestRouter"
import WordRouter from "./WordRouter"
import TemplateRouter from "./TemplateRouter"
import Authentication from "./AuthenticationRouter"
import MypagesRouter from "./MyPagesRouter"
import TestCreate from "../feature/test/create_test/TestCreate"
import { useEffect, useState } from "react"
import axios from "../libs/axios"

// 페이지 라우터 컴포넌트
const PageRouter: React.FC = () => {
  // 로그인 상태 (빈 문자열: 비로그인, 값이 있으면 로그인)
  const [isLogin, setIsLogin] = useState({id: "", nickname: "", profile: ""})

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("http://localhost:8080/api/auth/me")
        .then((res) => {
          console.log(res)
          if (res.data.isLogin) setIsLogin({id: res.data.user.id, nickname: res.data.user.name, profile: res.data.user.profile}) 
          
        })
      } catch (error) {
        console.log(error)
      }
    }
    checkLogin()
  }, [])
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
        <Route path="/create_test" element={<TestCreate/>}/>
      </Routes>
    </div>
  )
}

export default PageRouter