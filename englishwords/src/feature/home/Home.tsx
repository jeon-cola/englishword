import HomeFeatureBox from "./HomeFeatureBox"
import FeatureInfo from "./FeatureInfo"

// 홈 컴포넌트
const Home: React.FC = () => {
  return(
    <div className=" mt-20 flex flex-col px-5">

      <h1 className="font-bold flex flex-col gap-2">
        <p className="text-[#064B9D] text-5xl">SpeakUp</p>
        <p className="text-3xl">TOEIC SPEAKING 연습 사이트</p>
      </h1>

      <div className="flex justify-center items-center gap-7 mt-10">

        <HomeFeatureBox title="모의 테스트" color="#FFE680" image="test"/>
        <HomeFeatureBox title="단어암기" color="#A7E6C2" image="word"/>
        <HomeFeatureBox title="단계별 탬플릿" color="#BFEFFF" image="template"/>

      </div >

      <div className="flex flex-col gap-10 mt-20 w-full items-center mb-10">
        <FeatureInfo title="모의 시험을 통해 실력을 확인해보세요" content="시험과 유사한 방식의 문제를 풀어보면서 문제점을 확인하고 시험에 익숙해져보세요" image="test" sort={true}/>
        <FeatureInfo title="단어의 뜻과 발음을 외워보세요" content="시험에서 자주 나오는 단어를 발음과 함께 외워보세요" image="word" sort={false}/>
        <FeatureInfo title="단계별에 맞는 템플릿을 확인해보세요" content="단계별 자주 사용되는 문장을 템플릿으로 만나보세요" image="template" sort={true}/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Home