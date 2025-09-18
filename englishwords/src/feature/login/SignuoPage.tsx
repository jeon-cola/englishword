import React, { useRef } from "react"
import axios from "axios"

export interface CurrentPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<boolean>>
}

const signupPage:React.FC<CurrentPageProps> = ({setCurrentPage}) => {
  const signupEmailRef = useRef<HTMLInputElement>(null)
  const signupPasswordRef = useRef<HTMLInputElement>(null)
  const signupCheckPasswordRef = useRef<HTMLInputElement>(null)
  const signupNicknameRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)
  const monthRef = useRef<HTMLSelectElement>(null)
  const dayRef = useRef<HTMLSelectElement>(null)

    const signupHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const fetchData = async () => {
        try {
          await axios.post("http://localhost:8080/api/auth/signup", {
            id: signupEmailRef.current?.value,
            password: signupPasswordRef.current?.value, 
            nickname: signupNicknameRef.current?.value,
            birthday: `${yearRef.current?.value}-${monthRef.current?.value}-${dayRef.current?.value}`
          })
          .then((res) => {
            const data = res.data
            console.log(data)
            if (data === "successful") {
              setCurrentPage(false)
              window.alert("회원가입이 완료되었습니다. 로그인 해주세요.")
            }
        })
        } catch (error) {
          console.log(error)
          window.alert("회원가입에 실패했습니다. 다시 시도해주세요.")
        }
    }
    fetchData()
  }

  return (
    <form className="flex flex-col gap-10 h-full">

            <div className="text-lg text-[#CBC8C8] flex justtify-center items-center before:content-[''] before:flex-1 before:border-t before:border-[#CBC8C8] before:mr-4 after:content-[''] after:flex-1 after:border-t after:border-[#CBC8C8] after:ml-4 mt-5">
              <p >이메일로 가입하기</p>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-bold text-2xl text-left">생년월일</p>

              <div className="flex gap-5">
                <select 
                  id="year" 
                  name="year" 
                  className="border-2 rounded-xl  p-2 text-lg focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
                  ref={yearRef}
                >
                  <option value="">년</option>
                  {Array.from({length: 156}, (_, i) => 2025 - i).map(year => (
                    <option key={year} value={year}>{year}년</option>
                  ))}
                </select>

                <select 
                  id="month" 
                  name="month" 
                  className="border-2 rounded-xl p-2 text-lg focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
                  ref={monthRef}>
                  <option value="">월</option>
                  {Array.from({length: 12}, (_, i) => i +1).map(month => (
                    <option key={month} value={month}>{month}월</option>
                  ))}
                </select>

                <select 
                  id="day" 
                  name="day" 
                  className="border-2 rounded-xl p-2 text-lg focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
                  ref={dayRef}>
                  <option value="">일</option>
                  {Array.from({length: 31}, (_, i) => i +1).map(day => (
                    <option key={day} value={day}>{day}일</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">이메일</p>
              <input 
                ref={signupEmailRef}
                type="text"
                placeholder="user@email.com"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">닉네임</p>
              <input 
                ref={signupNicknameRef}
                type="text" 
                placeholder="json"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">비밀번호</p>
              <input 
                ref={signupPasswordRef}
                type="password"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">비밀번호 확인</p>
              <input 
                ref={signupCheckPasswordRef}
                placeholder="비밀번호를 다시 입력해주세요"
                type="password"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
               />
            </div>

            <div className="flex justify-center ">
              <button 
                className="bg-[#D2A7F4] p-1 text-white w-[250px] h-[70px] rounded-xl text-3xl mb-7"
                onClick={signupHandler}
              >회원가입</button>
            </div>
          </form>
  )
}

export default signupPage