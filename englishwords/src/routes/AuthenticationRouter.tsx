import Login from "../feature/login/Login"
import {LoginProps} from "../feature/login/Login"

const Authentication: React.FC<LoginProps> = ({setIsLogin}) => {
  return (
    <div>
      < Login setIsLogin={setIsLogin} />
    </div>
  )
}

export default Authentication