import { useSearchParams } from "react-router"
import bg from "../../componenets/background.png"
import white from "../../componenets/white.webp"
import yellow from "../../componenets/yellow.jpg"
import { useEffect, useState } from "react"
import axios from "../../libs/axios"
import { TestProps } from "../../routes/TestRouter"
import Part1 from "./parts/Part1"
import Part2 from "./parts/Part2"
import Part3 from "./parts/Part3"
import Part4 from "./parts/Part4"
import Part5 from "./parts/Part5"

export interface Content {
    content_id: number,
    content_type: "TEXT" | "IMAGE",
    content: string,
    content_order: number
}

const TestDetail:React.FC<TestProps> = ({isLogin}) => {
    const [searchParams] = useSearchParams()
    const testId = searchParams.get("test")
    const [part, setPart] = useState(searchParams.get("part"))
    const question = []
    const [contents, setContents] = useState<Content[]>([])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                await axios.get("http://localhost:8080/api/create_test/start_test", {params: {testId: testId, userId: isLogin.id, part: part}})
                .then((res) => {
                    const result = res.data.message
                    if (result === "success") {
                        const data = res.data.data
                        console.log(res.data.data)
                        setPart(data.part)
                        setContents(data.contents)
                        console.log(part)
                    }
                })
            } catch (error) {
                console.log(error)
                window.alert("서버에러!! 잠시후 다시 시도해주세요")
            }
        }
        fetchData()
    },[part])

    const renderPart = () => {
        switch (part) {
            case "1" :
                return (contents.map(c => (
                    <Part1 content={c} />)
                ))
            case "2" :
                return contents.map(c => (
                    <Part2 content={c}/>
                ))
            case "3" :
                return contents.map(c => (
                    <Part3 content={c}/>
                ))
            case "4" :
                return contents.map(c => (
                    <Part4 content={c}/>
                ))
            case "5" :
                return contents.map(c => (
                    <Part5 content={c}/>
                ))
            default: 
                return null
        }
    }

        const renderIntro = () => {
        switch (part) {
            case "1" :
                return (<div className="text-xl px-3">
                    <p>In this part of test, you will read aloud the text on the screen.</p>
                    <p>You will have 45 seconds to prepare.</p>
                    <p>Then you will have 45 seconds to read the text aloud</p>
                </div>)
            case "2" :
                return (<div className="text-xl px-3">
                        <p>In this part of the test, you will describe the picture on your screen in as much detail as you can.</p>
                        <p>You will have 45 seconds to prepare your response.</p>
                        <p>Then you will have 30 seconds to speak about the picture.</p>
                    </div>)
            case "3" : return (<div className="text-xl px-3">
                        <p>In this part of the test, you will answer three questions.</p>
                        <p>You will have three seconds to prepare after you hear each question.</p>
                        <p>You will have 15 seconds to response to Question 1 and 2, and 30 seconds to respond to Question3</p>
                    </div>)
            case "4" : return(<div className="text-xl px-3">
                        <p>In this part of the test, you will answer three questions based on the information provided.</p>
                        <p>You will have 45 seconds to read the information before the questions begin.</p>
                        <p>You will have three seconds to prepare and 15 seconds to respond to Questions 1 and 2.</p>
                        <p>You will hear Question 3 two times.</p>
                        <p>You will have three seconds to prepare and 30 seconds to respond to Question 3.</p>
                    </div>)
            case "5" : return(<div className="text-xl px-3">
                        <p>In this part of the test, you will give your opinion about a specific topic.</p>
                        <p>Be sure to say as much as you can in the time allowed.</p>
                        <p>You will have 45 seconds to prepare.</p>
                        <p>Then you will have 60 seconds to speak.</p>
                    </div>)
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
                <div className="flex flex-col gap-3 text-left px-10 py-5 text-xl overflow-y-auto">
                    <p className="font-bold text-3xl">문제{testId}</p>
                    <p className="font-bold text-xl">Part{part}</p>
                    {renderIntro()}
                    {renderPart()}
                </div>
            </div>

            </div>
        </div>
    )
}

export default TestDetail