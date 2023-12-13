const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      <span className="cursor-pointer">{children}</span>
      <div className="opacity-0 invisible w-24 bg-gray-800 text-white text-center rounded-md py-2 absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2 transition-opacity duration-300">
        {text}
        <svg
          className="absolute text-gray-800 h-2 w-full left-1/2 transform -translate-x-1/2 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};
export default Tooltip;
