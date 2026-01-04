import { useSearchParams } from "react-router"
import bg from "../../componenets/background.png"
import white from "../../componenets/white.webp"
import { useEffect, useState } from "react"
import axios from "../../libs/axios"
import { TestProps } from "../../routes/TestRouter"
import { Content, Question } from "./types"
import Part1 from "./parts/Part1"
import Part2 from "./parts/Part2"
import Part3 from "./parts/Part3"
import Part4 from "./parts/Part4"
import Part5 from "./parts/Part5"
import partNext from "../../componenets/partNext.png"
import partPre from "../../componenets/partPre.png"
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis"
import { renderIntro, introTextMap } from "./Intro"

const TestDetail:React.FC<TestProps> = ({isLogin}) => {
    const [searchParams] = useSearchParams()
    const testId = searchParams.get("test")
    const [part, setPart] = useState<string>(searchParams.get("part") ?? "0")
    const [contents, setContents] = useState<Content[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const {speak} = useSpeechSynthesis()

    const answerHandler = async (num: number) => {
        try {
            await axios.post("", {user: isLogin.id, testId: testId, part: part})
            .then((res) => {
                const data = res.data.data
                if (data === "success") setPart(String(num +1))
            })
        } catch (error) {
            console.log(error)
            alert("서버 에러!! 잠시후 다시 시도해주세요")
        }
    }

    const [complete, setComplete] = useState<Record<number, Record<number, string>>>({
        1: {1: "", 2: ""},
        2: {1: "", 2: ""},
        3: {1: "", 2: "", 3: ""},
        4: {1: "", 2: "", 3: ""},
        5: {1: ""}
    })

    const completeHandler = (part:number, order: number, answer: string) => {
        setComplete(prev => ({
            ...prev,
            [part]: {
                ...prev[part],
                [order]: answer
            }
        }))
    }

    useEffect(()=> {
        const fetchData = async () => {
            try {
                await axios.get("http://localhost:8080/api/create_test/content_list", {params: {testId: testId, userId: isLogin.id, part: part}})
                .then((res) => {
                    const result = res.data.message
                    if (result === "success") {
                        const data = res.data.data
                        setQuestions(data.questions)
                        setContents(data.contents)
                    }
                })
            } catch (error) {
                console.log(error)
                window.alert("서버에러!! 잠시후 다시 시도해주세요")
            }
        }
        fetchData()
        const text = introTextMap[part]
        if (text) speak(text.join(" "))

        return () => {
            window.speechSynthesis.cancel()
        }
    },[part])



    const renderPart = () => {
        switch (part) {
            case "1" :
                return (contents.map(c => (
                    <Part1 content={c} onComplete={(order, answer) => completeHandler(Number(part), order, answer)}  />)
                ))
            case "2" :
                return contents.map(c => (
                    <Part2 content={c} onComplete={(order, answer) => completeHandler(Number(part), order, answer)} />
                ))
            case "3" :
                return contents.map(c => (
                    <Part3 content={c} questions={questions} onComplete={(order, answer) => completeHandler(Number(part), order, answer)} />
                ))
            case "4" :
                return contents.map(c => (
                    <Part4 content={c} questions={questions} onComplete={(order, answer) => completeHandler(Number(part), order, answer)} />
                ))
            case "5" :
                return contents.map(c => (
                     <Part5 content={c} questions={questions} onComplete={(order, answer) => completeHandler(Number(part), order, answer)} />
                ))
            default: 
                return null
        }
    }

    return(
        <div 
            className="absolute inset-0 bg-cover bg-top bg-no-repeat flex justify-center"
            style={{backgroundImage: `url(${bg})`}}
        >
            <div className="mt-16 h-[835px] w-2/3 bg-cover rounded-xl shadow-xl"
            style={{backgroundImage: `url(${white})`}}>

            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col gap-3 text-left px-10 py-5 text-xl overflow-y-auto">
                    <p className="font-bold text-3xl">문제{testId}</p>
                    <p className="font-bold text-xl">Part{part}</p>
                    {renderIntro(part)}
                    {renderPart()}
                </div>
                
                    <div className="h-[110px] px-10 flex items-center justify-between border-t border-gray-300">
                        <img src={partPre} alt="partPre" 
                            className={`w-[80px] h-[80px] ${(part !== "1") ? "cursor-pointer" : "opacity-65 cursor-not-allowed"}`}
                            onClick={() => {
                                const num = Number(part)
                                if (num > 1) {
                                    setPart(String(num -1))
                                }
                            }}
                        />
                        <img src={partNext} alt="partNext" 
                            className={`w-[80px] h-[80px] ${(part !== "5") ? "cursor-pointer" : "opacity-65 cursor-not-allowed"}`}
                            onClick={() => {
                                const num = Number(part)
                                if (num < 5) {
                                    const allDone = Object.values(complete[num]).every(v => v.length > 0)
                                    if (!allDone) return alert("답변을 완료해주셔야 다음으로 넘어갈 수 있습니다")
                                    answerHandler(num)
                                }
                            }}
                        />
                    </div>

            </div>

            </div>
        </div>
    )
}

export default TestDetail