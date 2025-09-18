import LoginPage from "../feature/login/LoginPage"
import {LoginProps} from "../feature/login/LoginPage"

const Authentication: React.FC<LoginProps> = ({setIsLogin}) => {
  return (
    <div>
      < LoginPage setIsLogin={setIsLogin} />
    </div>
  )
}

export default Authentication