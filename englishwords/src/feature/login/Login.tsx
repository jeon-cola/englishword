import React, { useRef, } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

// 로그인 props 타입
interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<string>>
}

// 로그인 컴포넌트
const Login: React.FC<LoginProps> = ({setIsLogin}) => {

  // 로그인 정보
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const nav = useNavigate()

  // 로그인 버튼 클릭 핸들러
  const loginHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const fetchData = async () => {
      try {
        await axios.post("http://localhost:8080/api/auth/login", {
          id: emailRef.current?.value,
          password: passwordRef.current?.value
        })
        .then((res) => {
          const data = res.data
          if (data.message === "successful") {
            console.log(data)
            window.alert(`${data.user.name}님 환영합니다!`)
            setIsLogin(data.user.id)
            nav("/", { state: { id: data.user.id, name: data.user.name }})
          }
      })
      } catch (error: any) {
        console.log(error)
        if (error.response.data.message) {
          console.log(error.response.data.message)
          window.alert(error.response.data.message)
        } else {
          window.alert("로그인에 실패했습니다. 다시 시도해주세요.")
        }
      } 
    }
  fetchData()
  }
  return (
    <form className="flex flex-col gap-10 h-full">
            
      <div className="text-[#CBC8C8] text-lg flex justify-center before:content-[''] before:flex-1 before:border-t before:border-[#CBC8C8] before:mr-4 after:content-[''] after:flex-1 after:border-t after:border-[#CBC8C8] after:ml-4 items-center mt-5">
        <p>이메일로 로그인</p>
      </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-left text-2xl" >이메일</p>
              <input 
                ref={emailRef}
                type="text" 
                placeholder="이메일 주소를 입력해주세요" 
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
                />

            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">비밀번호</p>
                <p className="text-[#00A6ED] cursor-pointer text-md">비밀번호 찾기</p>
              </div>
              <input 
                ref={passwordRef}
                type="password" 
                placeholder="비밀번호를 입력해주세요" 
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
                />
            </div>

            <div className="flex justify-center"> 
              <button 
                className="bg-[#D2A7F4] p-1 text-white w-[250px] h-[70px] rounded-xl text-3xl"
                onClick={loginHandler}
              >로그인</button>
            </div>
          </form> 
  )
}

export default Login