import { useSearchParams } from "react-router"
import bg from "../../componenets/background.png"
import white from "../../componenets/white.webp"
import yellow from "../../componenets/yellow.jpg"
import { useEffect, useState } from "react"
import axios from "../../libs/axios"
import { TestProps } from "../../routes/TestRouter"

interface Content {
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
                        console.log(data.contents)
                    }
                })
            } catch (error) {
                console.log(error)
                window.alert("서버에러!! 잠시후 다시 시도해주세요")
            }
        }
        fetchData()
    },[])
    return(
        <div 
            className="absolute inset-0 bg-cover bg-top bg-no-repeat flex justify-center"
            style={{backgroundImage: `url(${bg})`}}
        >
            <div className="mt-16 h-[835px] w-2/3 bg-cover rounded-xl shadow-xl"
            style={{backgroundImage: `url(${white})`}}>
            
            <div className="flex flex-col gap-3 text-left px-5 py-2 text-xl">
                {contents.map(content => (
                    <div>
                        <p className="font-bold">Question {content.content_order}</p>
                        <p>{content.content}</p>
                    </div>
                ))}
            </div>

            </div>
        </div>
    )
}

export default TestDetail