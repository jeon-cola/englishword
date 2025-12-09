import { MyPagesProps } from "../../../routes/MyPagesRouter"
import Modal from "../../Modal"
import profile from "../../../componenets/profile.png"
import next_icon from "../../../componenets/next.png"
import { useRef, useState } from "react"
import axios from "axios"

const MyPage:React.FC<MyPagesProps> = ({isLogin, setIsLogin}) => {
    const [isModal, setIsModal] = useState(false)
    const [isConnect, setIsConnect] = useState<boolean | null>(null)
    const password = useRef<HTMLInputElement>(null)
    const changePassword = useRef<HTMLInputElement>(null)
    const nickname = useRef<HTMLInputElement>(null)
    const [isMode, setIsMode] = useState("")

    const changeNicknameHandler= async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/change_nickname", {id: isLogin.id, nickname: nickname.current?.value})
            .then((res) => {
                const data = res.data.message
                if (data === "successful") {
                    setIsLogin(prev => ({
                        ...prev,
                        nickname: res.data.data
                    }))
                    window.alert("닉네임이 성공적으로 변경되었습니다.")
                    setIsModal(false)
                }
            })
        } catch (error) {
            console.log(error)
            window.alert("서버에러 잠시후 시도해주세요")
        }
    }

    const changePasswordHandler = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/change_password", { id: isLogin.id ,password: password.current?.value, changePassword: changePassword.current?.value})
            .then((res) => {
                const data = res.data.message
                console.log(data)
                if (data === "successful") {
                    window.alert("비밀번호가 성공적으로 변경되었습니다.")
                    setIsModal(false)
                } else {
                    setIsConnect(false)
                }
            })
        } catch (error) {
            console.log(error)
            window.alert("서버에러 잠시후 시도해주세요")
        }
    }


    const passwordHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setIsMode("changePassword")
        setIsModal(true)
    }

    const nicknameHandelr = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setIsMode("changeNickname")
        setIsModal(true)
    }

    return(
        <div className="mt-[70px] px-[500px] flex flex-col justify-center gap-5">
        <p className="font-bold text-3xl text-left">설정</p>
            
            <div className="w-full  p-4 border rounded-xl shadow-xl" >
                <p className="font-bold text-2xl text-left mb-5">회원정보</p>
                <div className="flex items-center gap-4">
                    <img src={profile} alt="profile image" className="w-[80px]" />
                    <div className="flex flex-col text-left">
                        <p className="font-bold text-xl">닉네임 : {isLogin.nickname}</p>
                        <p className="font-bold text-xl">ID : {isLogin.id}</p>
                    </div>
                </div>
            </div>

                <div className="w-full p-4 border rounded-xl shadow-xl flex justify-between items-center">
                    <p className="font-bold text-2xl text-left">닉네임 변경하기</p>
                    <img src={next_icon} alt="next_icon" className="w-[30px]" onClick={nicknameHandelr}/>
                </div>

                <div className="w-full  p-4 border rounded-xl shadow-xl flex justify-between items-center">
                    <p className="font-bold text-2xl text-left">비밀번호 변경하기</p>
                    <img src={next_icon} alt="next icon" className="w-[30px]" onClick={passwordHandler}/>
                </div>



        { isModal && (isMode === "changeNickname") && <Modal 
            functionHandler={changeNicknameHandler}
            title="닉네임 변경"
            discript={
                <div className="w-full flex flex-col gap-2 mt-3">
                    <p className="text-left font-bold text-md" >닉네임</p>
                    <input ref={nickname} type="text" placeholder={isLogin.nickname} className="text-xl p-3 border-2 rounded-xl focus:border-[#064B9D] focus:outline-none focus:ring-2 focus:ring-[#064B9D] w-full mt-2"/>
                </div>
            }
            buttonName="변경"  isModal={setIsModal}
        />}

        { isModal && (isMode === "changePassword" ) &&  (< Modal 
            functionHandler={changePasswordHandler}
            title="비밀번호 변경" 
            discript={
                <div className="w-full flex flex-col gap-2 mt-3">
                    <p className="text-left font-bold text-md">기존 비밀번호</p>
                    <input ref={password} type="password" placeholder="기존 비밀번호를 입력해주세요" className="text-xl p-3 border-2 rounded-xl focus:border-[#064B9D] focus:outline-none focus:ring-2 focus:ring-[#064B9D] w-full mt-2"/>
                    {isConnect === false && (<p className="text-left text-red-500 px-1">기존 비밀번호와 일치하지 않습니다</p>)}
                    <p className="text-left font-bold text-md">변경 비밀번호</p>
                    <input ref={changePassword}type="password" placeholder="변경을 원하는 비밀번호를 입력해주세요" className="text-xl p-3 border-2 rounded-xl focus:border-[#064B9D] focus:outline-none focus:ring-2 focus:ring-[#064B9D] w-full mt-2"/>
                </div>} 
            buttonName="변경" isModal={setIsModal} />)}

        </div>
    )
}

export default MyPage