import { useState } from "react"
import purple from "../../componenets/purple.png"

const Login: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(false)
  return (
    <div className="flex">
      <img src={purple} alt="purple image" className="h-[640px] w-[800px]"/>

      <div className="flex flex-col w-full px-20 py-4 gap-5">
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
              <form className="flex flex-col gap-10 h-full justify-center">
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
        </form> : <form></form>}
      </div>
    </div>
  )
}

export default Login