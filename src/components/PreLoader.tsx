import { useEffect } from "react";
import { preLoaderAnim } from "../animations";
import "./PreLoader.css";

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Learn,</span>
        <span>Explore,</span>
        <span>Attend.</span>
      </div>
    </div>
  );
};

export default PreLoader;
