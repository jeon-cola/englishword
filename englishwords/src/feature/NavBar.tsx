import { useLocation, useNavigate } from "react-router"
import logo from "../componenets/logo.png"
import profile from "../componenets/profile.png"
import { useEffect, useRef, useState } from "react"

interface NavBarProps {
  isLogin: {
    id: string,
    nickname: string
  },
  setIsLogin: React.Dispatch<React.SetStateAction<{id: string, nickname: string}>>
}

// 네브바 컴포넌트
const NavBar:React.FC<NavBarProps> = ({isLogin, setIsLogin}) => {
  const nav = useNavigate()
  const location = useLocation()

  // 드롭다운 상태관리
  const [isOpen, setIsOpen] = useState(false)
  // 드롭다운 ref
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler)
    return () => {
    document.removeEventListener("mousedown", clickOutsideHandler)
  }
  },[])

  // 로그인 버튼 클릭 핸들러
  const loginHandler = () => {
    if (isLogin.id) {
      try {
        const fetchData = async () => {
          await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include",
          })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "successful") {
                setIsLogin({id: "", nickname: ""})
                window.alert("로그아웃 되었습니다.")
                setIsOpen(false)
                return nav("/")
            }
          })
        }
        fetchData()
      } catch (error) {
        console.log(error)
        window.alert("로그아웃에 실패했습니다. 다시 시도해주세요.")
      }
    }
    nav("/login")
  }

    if (location.pathname === "/login") {
    return null
  }

  return (
    <div className="flex justify-between px-5 py-4 items-center relative">

      <img src={logo} alt="logo image" onClick={() => nav("/")} className="cursor-pointer" />
      
      <div ref={dropdownRef}>
        {(isLogin.id) ? <img src={profile} alt="프로필 이미지" className="w-[40px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
        : <button className="bg-[#064B9D] py-1 px-2 rounded-md"
        onClick={ loginHandler }
        >
          <p className="text-xl text-white">로그인</p>
        </button>
        }
          {isOpen && <div  className="absolute top-full right-0 flex flex-col text-left rounded-xl mt-1 shadow-2xl pb-2">
              <div className="flex gap-2 px-5 py-2">
                <img src={profile} alt="profile image" className="w-[50px]" />
                <div className="gap-1">
                  <p className="font-bold">{isLogin.nickname}</p>
                  <p className="text-[#B4ACBC]">{isLogin.id}</p>
                </div>
              </div>
              <p 
                onClick={() => {nav("/mypages")}}
                className="font-bold text-[#374151] cursor-pointer hover:bg-[#E1DBDB] px-5 py-2 rounded-md"
                >설정</p>
              <p 
                className="cursor-pointer font-bold text-[#374151] px-5 py-2  hover:bg-[#E1DBDB] rounded-md"
                onClick={() => {
                  setIsLogin({id: "", nickname: ""})
                  loginHandler()
                }}>로그아웃</p>
            </div>}
        </div>
    </div>
  )
}

export default NavBar