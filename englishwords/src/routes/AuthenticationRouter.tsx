import LoginPage from "../feature/login/LoginPage"
import {LoginProps} from "../feature/login/LoginPage"

// 인증 라우터 컴포넌트
const Authentication: React.FC<LoginProps> = ({setIsLogin}) => {
  return (
    <div>
      < LoginPage setIsLogin={setIsLogin} />
    </div>
  )
}

export default Authentication