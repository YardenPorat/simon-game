import { getRandomNumber } from "./utils/get-random-number";

const DEBUG = true;
const log = DEBUG ? console.log.bind(console, "simon-service |") : () => {};

export class SimonGame {
  numbers = [];
  userNumbers = [];
  gameStarted = false;
  computerTurn = false;

  constructor(circleArray, setMessage) {
    log("constructor");
    this.circleArray = circleArray;
    this.setMessage = setMessage;
  }

  start = async () => {
    log("start");

    if (!this.gameStarted) {
      this.reset();
    }

    this.gameStarted = true;
    this.playComputerTurn();
  };

  playComputerTurn = async () => {
    log("playComputerTurn");

    this.setMessage("Computer's turn");
    this.computerTurn = true;

    const number = this.getNumber();
    this.numbers.push(number);

    this.userNumbers = [...this.numbers];
    for (const number of this.numbers) {
      log(`flashing number: ${number}`);
      await this.flash(this.circleArray[number]);
    }

    this.computerTurn = false;
    this.setMessage("");
    log("computer turn over, this.numbers", this.numbers);
  };

  onCircleClick = (e) => {
    if (!this.gameStarted) {
      this.setMessage("Press the start button to start the game");
      return;
    }

    const number = e.target.id;
    log(`onCircleClick: ${number}`);
    if (number !== String(this.userNumbers[0])) {
      log(
        `wrong user click ${number} instead of ${this.userNumbers[0]} (${this.userNumbers})`
      );
      this.setMessage(`You lost!`);
      this.gameStarted = false;
      return;
    }

    log(`correct user click`);
    this.userNumbers.shift();

    /** Shouldn't be sync, because we don't care when animation ends. */
    this.flash(this.circleArray[number]);

    if (this.userNumbers.length === 0) {
      log("user won round");
      this.setMessage("Correct");

      setTimeout(() => {
        this.playComputerTurn();
      }, 1000);
    }
    return;
  };

  reset = () => {
    log("reset");
    this.gameStarted = false;
    this.userNumbers = [];
    this.numbers = [];
  };

  flash = async (ref) => {
    log("flashing", ref.current.id);
    return new Promise((resolve) => {
      ref.current.addEventListener("animationend", (e) => {
        ref.current.classList.remove("flash");
        resolve();
      });

      ref.current.classList.add("flash");
    });
  };

  getNumber() {
    if (!this.numbers.length) {
      return getRandomNumber(0, 5);
    }

    let randomNumber = this.numbers.at(-1);
    while (randomNumber === this.numbers.at(-1)) {
      randomNumber = getRandomNumber(0, 5);
    }
    return randomNumber;
  }
}
