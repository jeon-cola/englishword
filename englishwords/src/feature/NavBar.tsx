import { useNavigate } from "react-router"
import logo from "../componenets/logo.png"

interface NavBarProps {
  isLogin: string,
  setIsLogin: React.Dispatch<React.SetStateAction<string>>
}

// 네브바 컴포넌트
const NavBar:React.FC<NavBarProps> = ({isLogin, setIsLogin}) => {
  const nav = useNavigate()

  // 로그인 버튼 클릭 핸들러
  const loginHandler = () => {
    if (isLogin) {
      try {
        const fetchData = async () => {
          await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include",
          })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "successful") {
                setIsLogin("")
                window.alert("로그아웃 되었습니다.")
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

  const homeHandler = () => {
    nav("/")  
  }
  return (
    <div className="flex justify-between px-5 py-2 items-center">
      <img src={logo} alt="logo image" onClick={homeHandler} className="cursor-pointer" />

      <button className="bg-[#064B9D] py-1 px-2 rounded-md"
        onClick={ loginHandler }
      >
        {isLogin ? <p className="text-xl text-white">로그아웃</p> :
        <p className="text-xl text-white">로그인</p>
        }
      </button>
    </div>
  )
}

export default NavBar