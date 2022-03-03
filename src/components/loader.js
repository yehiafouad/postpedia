const CustomLoader = ({ isLoading }) => {
  return isLoading && <div className="lds-hourglass"></div>;
};

export default CustomLoader;
