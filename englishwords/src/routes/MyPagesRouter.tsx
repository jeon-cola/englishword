import React from "react"
import MyPage from "../feature/login/mypage/Mypage"


 export interface MyPagesProps {
  isLogin: {
    id: string,
    nickname: string, 
    profile: string
  }, 
  setIsLogin: React.Dispatch<React.SetStateAction<{id: string, nickname: string, profile: string}>>
}

const MypagesRouter: React.FC<MyPagesProps> = ({isLogin, setIsLogin}) => {
  return(
    <MyPage isLogin={isLogin} setIsLogin={setIsLogin}/>
  )
}
export default MypagesRouter