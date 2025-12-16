const TestCreate:React.FC = () => {
    return(
        <div>
            <form action="" className="flex flex-col gap-2 my-20 px-20 text-left">
                <p className="text-3xl font-bold">part1</p>
                <p>question1</p>
                <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p>question2</p>
                <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p className="text-3xl font-bold" >part2</p>
                <p>image1</p>
                <input type="file" />
                <p>image2</p>
                <input type="file" />
                <p className="text-3xl font-bold">part3</p>
                <p>intro</p>
                <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p>question1</p>
                 <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p>question2</p>
                 <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p>question3</p>
                 <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p className="text-3xl font-bold">part4</p>
                <input type="file" />
                <p>question1</p>
                 <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p>question2</p>
                 <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p>question3</p>
                 <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p className="text-3xl font-bold">part5</p>
                <p>intro</p>
                <textarea name="" id="" className="border-2 rounded-xl p-3"/>
                <p>option</p>
                <input type="text" className="border-2 rounded-xl p-3" />
                <input type="text" className="border-2 rounded-xl p-3" />
                <input type="text" className="border-2 rounded-xl p-3" />

                <div className="flex items-center w-full justify-center mt-2">
                    <button className="bg-[#064B9D] w-[100px] p-2 rounded-xl text-white">생성</button>
                </div>
            </form>
        </div>
    )
}

export default TestCreate