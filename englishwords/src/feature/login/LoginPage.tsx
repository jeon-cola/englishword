import purple from "../../componenets/purple.png"
import React, { useState } from "react"
import Login from "./Login"
import SignupPage from "./SignuoPage"
import ForgotPassword from "./ForgotPassword"

// 로그인 페이지 props 타입
export interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<{id: string, nickname: string, profile: string}>>
}

// 로그인 페이지 컴포넌트
const LoginPage:React.FC<LoginProps> = ({setIsLogin}) => {

  // 현재 페이지 상태 (true: 회원가입, false: 로그인)
  const [currentPage, setCurrentPage] = useState(false)
  // 비밀번호 찾기 모달
  const [isModal, setIsModal] = React.useState(false)

  return (
    <div className="flex h-screen">
      <img src={purple} alt="purple image" className="h-full w-1/2 object-fill"/>

      <div className="flex flex-col w-1/2 px-20 py-4 gap-5 overflow-y-auto">
        <div className="flex gap-10">
          <h1 
            className={`font-bold text-3xl cursor-pointer ${currentPage ? "" : "text-[#CBC8C8]" } duration-300`}
            onClick={() => setCurrentPage(true)}
            >회원가입</h1>
          <h1 
            className={`font-bold text-3xl cursor-pointer ${!currentPage ? "" : "text-[#CBC8C8]" } duration-300`}
            onClick={() => setCurrentPage(false)}
            >로그인</h1>
        </div>
        {currentPage ? <SignupPage setCurrentPage={setCurrentPage} /> : <Login setIsLogin={setIsLogin} setIsModal={setIsModal}/>}
      </div>
        {isModal && <ForgotPassword setIsModal={setIsModal}/>}
    </div>
  )
}

export default LoginPage