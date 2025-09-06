import { useState } from "react"
import purple from "../../componenets/purple.png"

const Login: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(false)
  return (
    <div className="flex h-screen">
      <img src={purple} alt="purple image" className="h-full w-[800px] object-cover"/>

      <div className="flex flex-col w-full px-20 py-4 gap-5 overflow-y-auto">
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

      {!currentPage ? 
        <form className="flex flex-col gap-10 h-full">
                
          <div className="text-[#CBC8C8] text-lg flex justify-center before:content-[''] before:flex-1 before:border-t before:border-[#CBC8C8] before:mr-4 after:content-[''] after:flex-1 after:border-t after:border-[#CBC8C8] after:ml-4 items-center mt-5">
            <p>이메일로 로그인</p>
          </div>

                <div className="flex flex-col gap-2">
                  <p className="font-bold text-left text-2xl" >이메일</p>
                  <input 
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
                    type="password" 
                    placeholder="비밀번호를 입력해주세요" 
                    className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
                    />
                </div>

                <div className="flex justify-center"> 
                  <button className="bg-[#D2A7F4] p-1 text-white w-[250px] h-[70px] rounded-xl text-3xl">로그인</button>
                </div>
              </form> 
        : <form className="flex flex-col gap-10 h-full">

            <div className="text-lg text-[#CBC8C8] flex justtify-center items-center before:content-[''] before:flex-1 before:border-t before:border-[#CBC8C8] before:mr-4 after:content-[''] after:flex-1 after:border-t after:border-[#CBC8C8] after:ml-4 mt-5">
              <p >이메일로 가입하기</p>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-bold text-2xl text-left">생년월일</p>

              <div className="flex gap-5">
                <select id="year" name="year" className="border-2 rounded-xl  p-2 text-lg focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]">
                  <option value="">년</option>
                  {Array.from({length: 156}, (_, i) => 2025 - i).map(year => (
                    <option key={year} value={year}>{year}년</option>
                  ))}
                </select>

                <select id="month" name="month" className="border-2 rounded-xl p-2 text-lg focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]">
                  <option value="">월</option>
                  {Array.from({length: 12}, (_, i) => i +1).map(month => (
                    <option key={month} value={month}>{month}월</option>
                  ))}
                </select>

                <select id="day" name="day" className="border-2 rounded-xl p-2 text-lg focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]">
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
                type="text"
                placeholder="user@email.com"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">닉네임</p>
              <input 
                type="text" 
                placeholder="json"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">비밀번호</p>
              <input 
                type="password"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <p className="font-bold text-2xl text-left">비밀번호 확인</p>
              <input 
                type="password"
                className="text-xl p-3 border-2 rounded-xl focus:border-[#D2A7F4] focus:outline-none focus:ring-2 focus:ring-[#D2A7F4]"
               />
            </div>

            <div className="flex justify-center ">
              <button className="bg-[#D2A7F4] p-1 text-white w-[250px] h-[70px] rounded-xl text-3xl mb-7">회원가입</button>
            </div>
          </form>}
      </div>
    </div>
  )
}

export default Login