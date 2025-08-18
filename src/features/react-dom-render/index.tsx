import {useState} from "react";
import Card from "../../components/Card";
import {formatter, useTimestamp} from "../../hooks/useTimestamp";

const ReactDomRender = () => {
  const timestamp = useTimestamp();
  const date = new Date(timestamp);
  const [bgColor, setBgColor] = useState("bg-white");

  const changeColor = (color: string) => () => {
    setBgColor(color);
  };

  const changeSecondTimerToBlue = () => {
    const secondTimer = document.getElementById("second-timer");
    if (secondTimer) {
      secondTimer.style.backgroundColor = "blue";
    }
  };

  const baseTimerClasses =
    "p-5 m-3 rounded-lg text-xl shadow-md transition-colors duration-300";

  return (
    <Card title="Timer Demo">
      <div className={`${baseTimerClasses} ${bgColor} w-full`}>
        {formatter.format(date.getHours())}:
        {formatter.format(date.getMinutes())}:
        {formatter.format(date.getSeconds())}
      </div>
      <div
        id="second-timer"
        className={`${baseTimerClasses} ${bgColor} w-full`}
      >
        {`${formatter.format(date.getHours())}:${formatter.format(
          date.getMinutes()
        )}:${formatter.format(date.getSeconds())}`}
      </div>

      <div className="flex flex-col gap-3 mt-6 w-full">
        <button
          onClick={changeColor("bg-red-500")}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-colors"
        >
          Red Background
        </button>
        <button
          onClick={changeSecondTimerToBlue}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-colors"
        >
          Blue by document style
        </button>
      </div>
    </Card>
  );
};

export default ReactDomRender;
