import React from "react"

interface MyPagesProps {
  isLogin: {
    id: string,
    nickname: string
  }
}

const MypagesRouter: React.FC<MyPagesProps> = ({isLogin}) => {
  return(
    <div>{isLogin.nickname}</div>
  )
}
export default MypagesRouter