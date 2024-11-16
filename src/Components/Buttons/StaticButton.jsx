
const StaticButton = ({ width = 'w-full', text, border, borderColor, bgColor = "bg-mainColor", type = "button", Color = "text-white", Size = "text-2xl", px = "px-7", rounded = "rounded-xl", handleClick }) => {
       return (
              <button
                     type={type}
                     className={`${bgColor} ${width} ${Color} ${Size} ${border} ${borderColor} font-TextFontRegular ${rounded} pt-2 py-3 ${px}`}
                     onClick={handleClick}>
                     {text}
              </button>
       );
};
export default StaticButton;