import TestInfo from "../../componenets/testInfo.png"
import WordInfo from "../../componenets/wordInfo.png"
import TemplateInfo from "../../componenets/templateInfo.png"

// 기능 소개 props 타입
interface FeatureInfoProps {
  title: string
  content: string
  image: "test" | "word" | "template"
  sort: boolean
}

// 기능 소개 컴포넌트
const FeatureInfo: React.FC<FeatureInfoProps> = ({ title, content, image, sort }) => {

  // 이미지 매핑 객체
  const infoMap = {
    test: TestInfo,
    word: WordInfo,
    template: TemplateInfo,
  }

  return (
    <div className="flex w-[1100px] gap-6">
      {sort ? (
        <>
          <img
            src={infoMap[image]}
            alt={`${image} 이미지`}
            className="rounded-xl shadow-2xl"
          />
          <div className="flex flex-col gap-2 justify-center">
            <p className="font-bold text-4xl">{title}</p>
            <p>{content}</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 justify-center">
            <p className="font-bold text-4xl">{title}</p>
            <p>{content}</p>
          </div>
          <img
            src={infoMap[image]}
            alt={`${image} 이미지`}
            className="rounded-xl shadow-2xl"
          />
        </>
      )}
    </div>
  )
}

export default FeatureInfo
