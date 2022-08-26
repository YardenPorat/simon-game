import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle } from "./Circle";
import { SimonGame } from "./simon-service";

function App() {
  const [message, setMessage] = useState("");
  const item0 = useRef(null);
  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);
  const item4 = useRef(null);
  const item5 = useRef(null);

  const refArr = useMemo(() => {
    return [item0, item1, item2, item3, item4, item5];
  }, [item0, item1, item2, item3, item4, item5]);
  const [simonService, setSimonService] = useState();

  useEffect(() => {
    const simonService = new SimonGame(refArr, setMessage);
    setSimonService(simonService);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = async (e) => {
    await simonService.start(e);
  };
  const onCircleClick = async (e) => {
    await simonService.onCircleClick(e);
  };

  return (
    <div className="App">
      <button onClick={start}>Start</button>
      <div className="grid">
        <Circle id="0" onClick={onCircleClick} ref={item0} />
        <Circle id="1" onClick={onCircleClick} ref={item1} />
        <Circle id="2" onClick={onCircleClick} ref={item2} />
        <Circle id="3" onClick={onCircleClick} ref={item3} />
        <Circle id="4" onClick={onCircleClick} ref={item4} />
        <Circle id="5" onClick={onCircleClick} ref={item5} />
      </div>
      <div style={{ padding: "20px" }}>{message}</div>
    </div>
  );
}

export default App;
