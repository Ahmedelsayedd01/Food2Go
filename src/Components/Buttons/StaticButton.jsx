import Loading from "../Loaders/Loading";

const StaticButton = ({ stateLoding, Width, Text, BgColor = "bg-mainColor", type = "button", Color = "text-white", Size = "text-2xl", px = "px-7", rounded = "rounded-xl", handleClick }) => {
       return (
              <button
                     type={type}
                     className={`${BgColor} w-${Width} ${Color} ${Size}  font-medium ${rounded} pt-2 py-3 ${px}`}
                     onClick={handleClick}>
                     {!stateLoding ? Text : <div className="w-full flex items-center justify-center m-auto">
                            <Loading />
                     </div>}
              </button>
       );
};
export default StaticButton;