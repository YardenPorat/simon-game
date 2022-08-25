import "./App.css";
import { getRandomNumber } from "./utils/get-random-number";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Circle } from "./Circle";

const sleep = (/** @type {number} */ ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  /** @type {{current: number[]}} */
  const numbers = useRef([]);

  /** @type {{current: number[]}} */
  const userNumbers = useRef([]);

  const [isShowing, setIsShowing] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const item0 = useRef(null);
  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);
  const item4 = useRef(null);
  const item5 = useRef(null);

  const refObject = useMemo(() => {
    return {
      0: item0,
      1: item1,
      2: item2,
      3: item3,
      4: item4,
      5: item5,
    };
  }, [item0, item1, item2, item3, item4, item5]);

  /**
   * @param {string} id
   */
  const flash = useCallback(
    async (/** @type {  string | number } */ id) => {
      // @ts-ignore
      const ref = refObject[id];
      ref.current.classList.remove("flash");
      ref.current.classList.add("flash");
      await sleep(1_000);
      ref.current.classList.remove("flash");
    },
    [refObject]
  );

  const initGame = useCallback(async () => {
    setIsShowing(true);
    // TODO: repeated numbers are allowed
    /**
     * @type {number}
     */
    let randomNumber = numbers.current[numbers.current.length - 1];
    while (randomNumber === numbers.current[numbers.current.length - 1]) {
      randomNumber = getRandomNumber(0, 5);
    }
    // const randomNumber = getRandomNumber(0, 1);

    const currentNumbers = [...numbers.current, randomNumber];
    numbers.current.push(randomNumber);
    userNumbers.current = currentNumbers;

    for (const number of currentNumbers) {
      await flash(number.toString());
    }

    setIsShowing(false);
    setIsComputerTurn(false);
  }, [flash]);

  const onClick = async (/** @type {{ target: { id: string }; }} */ e) => {
    if (numbers.current.length === 0) {
      alert("Press the start button to start the game");
    }

    const { id } = e.target;
    // @ts-ignore
    const shouldBeClicked = userNumbers.current.shift().toString();
    if (id === shouldBeClicked) {
      // correct click
      await flash(id);

      if (userNumbers.current.length === 0) {
        // computer's turn
        setIsComputerTurn(true);
      }
    } else {
      alert(`Game over ${id} instead of ${shouldBeClicked}`);
    }
  };

  const reset = () => {
    numbers.current = [];
    userNumbers.current = [];
    setIsShowing(false);
    setIsComputerTurn(false);
  };

  useEffect(() => {
    if (isComputerTurn && !isShowing) {
      // sleep to delay the computer's turn
      sleep(500).then(initGame);
    }
  }, [initGame, isShowing, isComputerTurn]);

  return (
    <div className="App">
      <button
        disabled={isShowing}
        onClick={() => {
          reset();
          setIsComputerTurn(true);
        }}
      >
        Start
      </button>
      <div className="grid">
        <Circle
          // @ts-ignore
          id="0"
          onClick={onClick}
          ref={item0}
        />
        <Circle
          // @ts-ignore
          id="1"
          onClick={onClick}
          ref={item1}
        />
        <Circle
          // @ts-ignore
          id="2"
          onClick={onClick}
          ref={item2}
        />
        <Circle
          // @ts-ignore
          id="3"
          onClick={onClick}
          ref={item3}
        />
        <Circle
          // @ts-ignore
          id="4"
          onClick={onClick}
          ref={item4}
        />
        <Circle
          // @ts-ignore
          id="5"
          onClick={onClick}
          ref={item5}
        />
      </div>
      {isShowing ? <div>computer turn</div> : null}
    </div>
  );
}

export default App;
