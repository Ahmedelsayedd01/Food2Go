import { FaPlus } from "react-icons/fa";
const ButtonAdd = ({ isWidth = false, Text = 'Add', BgColor = "white", Color = "thirdColor", Size = "xl", handleClick, iconColor = "mainColor" }) => {
       return (
              <button
                     type='button'
                     className={`flex shadow cursor-pointer items-center w-${isWidth ? "full" : ''} gap-x-2 justify-center bg-${BgColor} font-medium rounded-lg px-4 py-3 outline-none`}
                     onClick={handleClick}>
                     <FaPlus className={`text-${iconColor}`} /> <span className={`text-${Color} text-${Size}`}> {Text}</span>
              </button>
       );
};
export default ButtonAdd;