import bg from "../../componenets/background.png"
import white from "../../componenets/white.webp"

// 템플릿 컴포넌트
const Template: React.FC = () => {
  const parts = [2, 3, 4, 5]
  return (
    <div 
      className="absolute inset-0 bg-cover bg-top bg-no-repeat flex justify-center"
      style={{backgroundImage: `url(${bg})`}}
    >
      <div className="mt-16 h-[835px] w-2/3 bg-cover rounded-xl shadow-xl"
        style={{backgroundImage: `url(${white})`}}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 text-left font-bold text-3xl ">TOEIC Speaking Template</div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4 px-4">
              {parts.map((part) => (
                <div
                  key={part} className="border-4 p-6 font-bold rounded-xl border-[#BEB8B8] cursor-pointer
                    transition-transform duration-950 ease-out
                    hover:scale-[1.01] hover:shadow-lg"
                >
                  <p className="text-2xl">Part {part}</p>
                  <p className="text-lg text-gray-600 mt-2">
                    {part === 2 && "사진 묘사 핵심 표현 모음"}
                    {part === 3 && "의견 제시 및 이유 설명 템플릿"}
                    {part === 4 && "짧은 질문 응답 패턴"}
                    {part === 5 && "해결책 제시 템플릿"}
                  </p>
                </div>
              ))}
            </div>

              <div className="mx-5 mt-6 rounded-x text-left">
                <p className="font-bold text-3xl mb-3">Template 이란?</p>
                <p className="text-xl leading-relaxed">
                  Template은 TOEIC Speaking에서 Part별로 자주 쓰이는
                  문장 구조와 표현을 정리한 학습 도구입니다.<br/>
                  반복 학습을 통해 답변 속도와 정확도를 동시에 향상시킬 수 있습니다.
                </p>
              </div>

              <div className="flex flex-col gap-2 mx-5 mt-6 mb-4">
                <p className="font-bold text-3xl text-left">Template 효과</p>
                <div className="grid grid-cols-3 gap-4 ">
                  <div className="border-4  p-4 rounded-xl border-[#BEB8B8]">
                    <p className="font-bold text-lg">📈 점수 향상</p>
                    <p className="mt-2">자주 쓰이는 문장을 자동화</p>
                  </div>
                  <div className="border-4  p-4 rounded-xl border-[#BEB8B8]">
                    <p className="font-bold text-lg">⏰ 시간 절약</p>
                    <p className="mt-2">생각하는 시간 최소화</p>
                  </div>
                  <div className="border-4  p-4 rounded-xl border-[#BEB8B8]">
                    <p className="font-bold text-lg">🧠 구조화</p>
                    <p className="mt-2">논리적인 답변 패턴 학습</p>
                  </div>
                </div>
              </div>

          </div>

        </div>

      </div>


    </div>
  )
}

export default Template