const PrimaryButton = ({ title, icon }) => {
  return (
    <button className="flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-md">
      {title} {icon ? icon : ""}
    </button>
  );
};

export default PrimaryButton;
