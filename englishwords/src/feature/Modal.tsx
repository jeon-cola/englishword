import closeIcon from "../componenets/close.png"

interface ModalProps {
    title: string,
    discript: React.ReactNode,
    buttonName?: string,
    isModal: React.Dispatch<React.SetStateAction<boolean>>
    functionHandler: () => void
}

const Modal:React.FC<ModalProps> = ({title, discript, buttonName, isModal, functionHandler}) => {
    return(
        <div className="fixed inset-0 top-0 w-full h-full bg-gray-400 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[600px] relative flex flex-col">
            <img src={closeIcon} alt="닫기 버튼" className="w-[40px] h-[40px] absolute top-3 right-3" onClick={() => {isModal(false)}} />
                <p className="font-bold text-2xl">{title}</p>
                {discript}

                <div className="flex justify-center gap-5 mt-auto pt-4">
                    <button className="text-gray-400 border px-4 py-2 rounded-md font-bold text-xl">취소</button>
                    <button className="text-white bg-[#064B9D] border px-4 py-2 rounded-md font-bold text-xl" onClick={functionHandler}>{buttonName ? buttonName : "확인"}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal