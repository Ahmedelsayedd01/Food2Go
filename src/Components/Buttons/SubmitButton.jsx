
const SubmitButton = ({ width = 'w-full', text, bgColor = "bg-mainColor", Color = "text-white", Size = "text-2xl", px = "px-7", rounded = "rounded-xl", handleClick }) => {
       return (
              <button
                     type='submit'
                     className={`${bgColor} ${width} ${Color} ${Size} font-TextFontRegular ${rounded} pt-2 py-3 ${px}`}
                     onClick={handleClick}>
                     {text}
              </button>
       );
};
export default SubmitButton;