import HomeFeatureBox from "./HomeFeatureBox"
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

      </div>
    </div>
  )
}

export default Home