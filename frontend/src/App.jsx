import darkLogo from "../src/assets/logo/dark-logo.png";

import banner from "../src/assets/img/banner.png";
function App() {
  return (
    <div className="bg-[#111827]">
      <div className="flex justify-around items-start">
        <img src={darkLogo} className="w-72 m-10" alt="" />
        {/* <img src={lightLogo} className="w-72 m-10" alt="" /> */}
        {/* drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] */}
        <div className="drop-shadow-[0_10px_15px_rgba(255,255,255,0.3)]">
          <img
            src={banner}
            className="scale-x-[-1] w-2/3 m-10"
            alt=""
          />
        </div>
        {/* <img src={banner} className="w-1/2 m-10" alt="" /> */}
      </div>
      <h1 className="text-white text-5xl text-center p-10">Hello World</h1>
    </div>
  );
}

export default App;
