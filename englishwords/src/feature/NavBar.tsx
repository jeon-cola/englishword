import logo from "../componenets/logo.png"

const NavBar:React.FC = () => {
  return (
    <div className="flex justify-between px-5 py-2 items-center">
      <img src={logo} alt="logo image" />

      <button className="bg-[#064B9D] py-1 px-2 rounded-md">
        <p className="text-xl text-white">로그인</p>
      </button>
    </div>
  )
}

export default NavBar