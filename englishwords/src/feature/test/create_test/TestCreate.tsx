import axios from "../../../libs/axios"
import { useRef } from "react"

const TestCreate:React.FC = () => {
    const part1Q1 = useRef<HTMLTextAreaElement | null>(null)
    const part1Q2 = useRef<HTMLTextAreaElement | null>(null)

    const part2F1 = useRef<HTMLInputElement | null>(null)
    const part2F2 = useRef<HTMLInputElement | null>(null)

    const part3Intro = useRef<HTMLTextAreaElement | null>(null)
    const part3Q1 = useRef<HTMLTextAreaElement | null>(null)
    const part3Q2 = useRef<HTMLTextAreaElement | null>(null)
    const part3Q3 = useRef<HTMLTextAreaElement | null>(null)

    const part4F = useRef<HTMLInputElement>(null)
    const part4Q1 = useRef<HTMLTextAreaElement | null>(null)
    const part4Q2 = useRef<HTMLTextAreaElement | null>(null)
    const part4Q3 = useRef<HTMLTextAreaElement | null>(null)

    const part5Q = useRef<HTMLTextAreaElement | null>(null)
    const part5O1 = useRef<HTMLInputElement | null>(null)
    const part5O2 = useRef<HTMLInputElement | null>(null)
    const part5O3 = useRef<HTMLInputElement | null>(null)

    const createTestHandler = async (e: React.MouseEvent) => {
        e.preventDefault()
        let testId
        try {
            await axios.post("http://localhost:8080/api/create_test/test")
            .then((res) => {
                const result = res.data.message
                if ( result === "success") {
                    testId = res.data.testId
                }
            })
            await axios.post("http://localhost:8080/api/create_test/part/", {
                testId,
                parts: [
                    {
                    part_no: 1,
                    contents: [
                        { type: "TEXT", content: part1Q1.current?.value, order: 1 },
                        { type: "TEXT", content: part1Q2.current?.value, order: 2 }
                    ]
                    },
                    {
                    part_no: 2,
                    contents: [
                        { type: "IMAGE", content: part2F1.current?.value, order: 1 },
                        { type: "IMAGE", content: part2F2.current?.value, order: 2 }
                    ]
                    },
                    {
                    part_no: 3,
                    contents: [ { type: "INTRO", content: part3Intro.current?.value, order: 1 } ],
                    questions: [
                        { text: part3Q1.current?.value, order: 1 },
                        { text: part3Q2.current?.value, order: 2 },
                        { text: part3Q3.current?.value, order: 3 }
                    ]
                    },
                    {
                    part_no: 4,
                    contents: [ { type: "IMAGE", content: part4F.current?.value, order: 1 } ],
                    questions: [
                        { text: part4Q1.current?.value, order: 1 },
                        { text: part4Q2.current?.value, order: 2 },
                        { text: part4Q3.current?.value, order: 3 }
                    ]
                    },
                    { 
                    part_no: 5,
                    questions: [ { text: part5Q.current?.value, order: 1 } ],
                    options: [
                        part5O1.current?.value,
                        part5O2.current?.value,
                        part5O3.current?.value
                    ]
                    }
                ]
                })

            .then((res) => {
                const result = res.data.message
                if ( result === "success") {
                    window.alert("생성 성공!!")
                }
            })
        } catch (error) {
            console.log(error)
            window.alert("서버에러 잠시후 시도해주세요")
        }
    }
    return(
        <div>
            <form action="" className="flex flex-col gap-2 my-20 px-20 text-left">
                <p className="text-3xl font-bold">part1</p>
                <p>question1</p>
                <textarea ref={part1Q1} className="border-2 rounded-xl p-3"/>
                <p>question2</p>
                <textarea ref={part1Q2} className="border-2 rounded-xl p-3"/>

                <p className="text-3xl font-bold" >part2</p>
                <p>image1</p>
                <input type="file" ref={part2F1}/>
                <p>image2</p>
                <input type="file" ref={part2F2}/>

                <p className="text-3xl font-bold">part3</p>
                <p>intro</p>
                <textarea ref={part3Intro}  className="border-2 rounded-xl p-3"/>
                <p>question1</p>
                 <textarea ref={part3Q1} className="border-2 rounded-xl p-3"/>
                <p>question2</p>
                 <textarea ref={part3Q2} className="border-2 rounded-xl p-3"/>
                <p>question3</p>
                 <textarea ref={part3Q3} className="border-2 rounded-xl p-3"/>

                <p className="text-3xl font-bold">part4</p>
                <input type="file" ref={part4F}/>
                <p>question1</p>
                 <textarea ref={part4Q1} className="border-2 rounded-xl p-3"/>
                <p>question2</p>
                 <textarea ref={part4Q2} className="border-2 rounded-xl p-3"/>
                <p>question3</p>
                 <textarea ref={part4Q3} className="border-2 rounded-xl p-3"/>

                <p className="text-3xl font-bold">part5</p>
                <p>intro</p>
                <textarea ref={part5Q} className="border-2 rounded-xl p-3"/>
                <p>option</p>
                <input type="text" className="border-2 rounded-xl p-3" ref={part5O1}/>
                <input type="text" className="border-2 rounded-xl p-3" ref={part5O2}/>
                <input type="text" className="border-2 rounded-xl p-3" ref={part5O3}/>

                <div className="flex items-center w-full justify-center mt-2">
                    <button className="bg-[#064B9D] w-[100px] p-2 rounded-xl text-white" onClick={createTestHandler}>생성</button>
                </div>
            </form>
        </div>
    )
}

export default TestCreate