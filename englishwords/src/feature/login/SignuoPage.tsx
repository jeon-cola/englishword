import React, { useRef, useState } from "react"
import axios from "axios"

export interface CurrentPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<boolean>>
}

const SignupPage:React.FC<CurrentPageProps> = ({setCurrentPage}) => {
  const [isAble, setIsAble] = useState({
    isValid: null as null | Boolean,  // 이메일 형식이 유효한지 여부
    isAvailable: null as null | boolean // 이메일이 사용 가능한지 여부
  })

  const signupEmailRef = useRef<HTMLInputElement>(null)
  const [signupPassword,setSignupPassword] = useState("")
  const [signupCheckPassword, setSignupCheckPassword] = useState("")
  const signupNicknameRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)
  const monthRef = useRef<HTMLSelectElement>(null)
  const dayRef = useRef<HTMLSelectElement>(null)

  // 이메일 중복 검사
  const emailVaildHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value
    const fetchData = async () => {
      try {
        await axios.post("http://localhost:8080/api/auth/check", {email: email})
        .then((res) => {
          const data = res.data.message
          if (data === "available") {
            setIsAble( ({ ...isAble, isAvailable: true }))
          } else {
            setIsAble( ({ ...isAble, isAvailable: false }))
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }

  // 이메일 유효성 검사
  const emailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

    // 이메일 형식 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const email = e.target.value
    const isValid = emailRegex.test(email)

    if (!isValid) {
      setIsAble({ ...isAble, isValid: false })
      return
    } else {
      setIsAble( ({ ...isAble, isValid: true }))
    }
  }

  // 로그인 버튼 클릭 핸들러
  const signupHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const fetchData = async () => {
      try {
        await axios.post("http://localhost:8080/api/auth/signup", {
          id: signupEmailRef.current?.value,
          password: signupPassword, 
          nickname: signupNicknameRef.current?.value,
          birthday: `${yearRef.current?.value}-${monthRef.current?.value}-${dayRef.current?.value}`
        })
        .then((res) => {
          const data = res.data
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
                onChange={emailHandler}
                onBlur={emailVaildHandler}
              /> 
              {
                isAble.isValid === false ? (<p className="text-red-500 text-sm text-left ml-1">이메일 형식이 올바르지 않습니다</p>)
                : isAble.isAvailable === false ? (<p className="text-red-500 text-sm text-left ml-1">이미 사용 중인 이메일입니다</p>)
                : isAble.isAvailable && isAble.isValid ? (<p className="text-green-500 text-sm text-left ml-1">사용 가능한 이메일입니다</p>) : null
              }
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
                onChange={(e) => setSignupPassword(e.target.value)}
                type="password"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">비밀번호 확인</p>
              <input 
                onChange={(e) => setSignupCheckPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력해주세요"
                type="password"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
               />
               {
                signupCheckPassword && signupCheckPassword &&signupPassword !== signupCheckPassword  ?
                <p className="text-red-500 text-sm text-left ml-1">비밀번호가 다릅니다. 다시 확인해 주세요</p>
                : null
              }
            </div>

            <div className="flex justify-center ">
              <button 
                className={`bg-[#D2A7F4] p-1 text-white w-[250px] h-[70px] rounded-xl text-3xl mb-7
                  ${(!signupEmailRef.current?.value ||
                  !signupPassword ||
                  !signupCheckPassword ||
                  !signupNicknameRef.current?.value ||
                  !yearRef.current?.value ||
                  !monthRef.current?.value ||
                  !dayRef.current?.value ||
                  signupPassword !== signupCheckPassword ||
                  isAble.isAvailable === false ||
                  isAble.isValid === false) ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                onClick={signupHandler}
                disabled={
                  !signupEmailRef.current?.value ||
                  !signupPassword ||
                  !signupCheckPassword ||
                  !signupNicknameRef.current?.value ||
                  !yearRef.current?.value ||
                  !monthRef.current?.value ||
                  !dayRef.current?.value ||
                  signupPassword !== signupCheckPassword ||
                  isAble.isAvailable === false ||
                  isAble.isValid === false
                }
              >회원가입</button>
            </div>
          </form>
  )
}

export default SignupPage