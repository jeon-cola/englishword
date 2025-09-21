import axios from "axios"
import React, { ReactEventHandler, useRef, useState } from "react"
import cloaseIcon from "../../componenets/close.png"

interface ForgotPasswordProps  {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}


const ForgotPassword: React.FC<ForgotPasswordProps> = ({setIsModal}) => {
  // 이메일 ref
  const email = useRef<HTMLInputElement>(null)
  // 이메일 전송 상태
  const [emailSent, setEmailSent] = React.useState(false)

  // 이메일 확인 
  const [failFound, setFailFound] = useState(false)

  const sendEmailHandler = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
      try {
        await axios.post("http://localhost:8080/api/auth/forgot_email", { email: email.current?.value })
        .then((res) => {
          const data = res.data.message
          if (data === "successful") {  
            setEmailSent(true)
            setFailFound(false)
          } else {
            setFailFound(true)
          }
        })
      } catch (error) {
        console.log(error)
        window.alert("서버에러!! 잠시후 시도해 주세요")
      }
    
  }
  return (
    <div className="fixed inset-0 top-0 w-full h-full bg-gray-400 bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white p-4 rounded-lg shadow-lg w-[600px] h-[300px] relative">

        <h1 className="text-2xl font-bold">비밀번호 찾기</h1>

        <img src={cloaseIcon} alt="닫기 버튼" className="w-[40px] h-[40px] absolute top-3 right-3" onClick={() => setIsModal(false)} />

        {!emailSent 
          ? <form  >
          <div>
            <p className="font-bold text-left text-2xl mt-8 ml-2" >이메일</p>
            <input 
              ref={email}
              type="text" 
              placeholder="이메일 주소를 입력해주세요" 
              className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4] w-full mt-2"
              />
          </div>
          {failFound ? <p className="text-red-500 text-sm text-left ml-1 mt-2">해당 이메일로 가입된 아이디가 없습니다</p> : ""}

          <button 
            className="bg-[#D2A7F4] p-1 text-white w-[200px] h-[60px] rounded-xl text-2xl mt-5"
            onClick={sendEmailHandler}
          >비밀번호 찾기</button>
        </form>
        : 
          <p className="text-lg mt-20 text-[#D2A7F4] font-bold">임시 비밀번호를 이메일로 전송하였습니다.</p>
        }
        

      </div>


    </div>
  )
}
export default ForgotPassword