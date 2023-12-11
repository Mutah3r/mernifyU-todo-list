import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="darkslategrey"
      strokeWidth="5"
      animationDuration="0.75"
      width="30"
      visible={true}
    />
  );
};

export default Loader;
