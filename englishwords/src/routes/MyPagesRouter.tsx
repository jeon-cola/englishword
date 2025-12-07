import React from "react"
import MyPage from "../feature/login/mypage/Mypage"


 export interface MyPagesProps {
  isLogin: {
    id: string,
    nickname: string
  }
}

const MypagesRouter: React.FC<MyPagesProps> = ({isLogin}) => {
  return(
    <MyPage isLogin={isLogin}/>
  )
}
export default MypagesRouter