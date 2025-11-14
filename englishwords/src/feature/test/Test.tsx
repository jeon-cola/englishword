import bg from "../../componenets/background.png"
import white from "../../componenets/white.webp"
// 테스트 컴포넌트
const Test:React.FC = () => {
  const testList = []
  return (
    <div 
      className="absolute inset-0 bg-cover bg-top bg-no-repeat flex justify-center"
      style={{backgroundImage: `url(${bg})`}}
    >
      <div className="mt-16 h-[800px] w-2/3 bg-cover rounded-xl shadow-xl"
        style={{backgroundImage: `url(${white})`}}
      >
        <div>
          <div className="p-5 text-left font-bold text-3xl ">TOEIC Speaking Test</div>


        </div>
      </div>
    </div>
  )
}
export default Test