import testImg from "../../componenets/test.png"
import wordImg from "../../componenets/word.png"
import templateImg from "../../componenets/template.png"
import { Navigate, useNavigate } from "react-router"

interface HomeFeatureBoxProps {
  title: string,
  color: string,
  image: "test" | "word" | "template"
}

const HomeFeatureBox:React.FC<HomeFeatureBoxProps> = ({title,color, image}) => {
  const nav = useNavigate()
  const content = {
    "test" : [testImg, "시험을 통해 실력을 확인해보세요"],
    "word" : [wordImg, "단어 암기를 통해 실력을 향상 시켜보세요"],
    "template" : [templateImg, "단계별 템플릿을 시험해보세요"]
}
  const featureHandler = () => {
    nav(`/${image}`)
  }
  return (
    <div 
      className={`bg-[${color}] w-[300px] h-[300px] p-2 rounded-xl hover:scale-[1.1] cursor-pointer transition-all duration-950 ease-in-out shadow-[0_4px_20px_0_rgba(0,0,0,0.30)]`}
      onClick={featureHandler}
    >
      <p className="text-[#374151] font-bold text-3xl">{title}</p>

      <div className="w-full flex justify-end mt-5">
        <img src={content[image][0]} alt={`${title} image`} className="w-[170px]"/>
      </div>

      <div className="w-full mt-5">
        <p className="text-md text-[#374151]">{content[image][1]}</p>
      </div>
    </div>
  )
}
export default HomeFeatureBox