import Test from "../feature/test/Test"

 export interface TestProps {
  isLogin: {
    id: string,
    nickname: string, 
    profile: string
  }
}
// 테스트 라우터 컴포넌트
const TestRouter:React.FC<TestProps> = ({isLogin}) => {
  return(
    <div>
      <Test isLogin={isLogin}/>
    </div>
  )
}
export default TestRouter