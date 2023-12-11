import { LuDiamond } from "react-icons/lu";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <span className="flex gap-2 items-center text-blue-500 text-[30px] font-bold">
          <LuDiamond className="font-bold" />
          <span className="text-neutral-700 tracking-wider">TODO.</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
