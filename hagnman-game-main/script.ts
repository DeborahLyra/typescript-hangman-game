let randomWord: string = ''

async function getWordAndHint() {
  const resp = await fetch('words.json');
  const data = await resp.json()
  const randomChoice = await data[Math.floor(Math.random() * data.length)];
  return randomChoice
}

async function startGame() {
  const resp = await getWordAndHint()
  randomWord = await resp.word.toLowerCase()
  console.log(randomWord)
  const randomHint = await resp.hint
  // const hint = <HTMLParagraphElement>document.querySelector('.hint').innerHTML = `<p class= "hint-text">Hint: ${randomHint}</p>`
  const hint = <HTMLParagraphElement>document.querySelector('.hint');
  hint.innerHTML = `<p class= "hint-text">Hint: ${randomHint}</p>`
}

startGame().then(() => {
  let wordArray = randomWord.split("");
  let correctLetter: string[] = [];
  let wrongLetter: string[] = [];

  showCorrectLetters();
  incorrectGuesses();
  lettersButton();

  document.addEventListener("keydown", (event) => {
    const code = event.keyCode;
    if (isLetter(code)) {
      const letter = event.key;

      if (wrongLetter.includes(letter)) {
        repeatedLetter();
      } else {
        if (wordArray.includes(letter) && !correctLetter.includes(letter)) {
          correctLetter.push(letter);
        } else if (
          !wordArray.includes(letter) &&
          !correctLetter.includes(letter)
        ) {
          wrongLetter.push(letter);
        }
      }
      playGame();
    }
  });

  function playGame() {
    showWrongLetters();
    showCorrectLetters();
    checkGame();
    incorrectGuesses();
    showBody();
  }

  function showWrongLetters() {
    const wrongLetters = <HTMLDivElement>document.querySelector(".wrong-letter");
    wrongLetters.innerHTML = "";
    wrongLetter.forEach((letter) => {
      wrongLetters.innerHTML += `<span>${letter}</span>`;
    });
  }

  function showCorrectLetters() {
    const secretWord = <HTMLDivElement>document.querySelector(".secret-word-container");
    secretWord.innerHTML = "";
    wordArray.forEach((letter) => {
      if (correctLetter.includes(letter)) {
        secretWord.innerHTML += `<span>${letter}</span>`;
      } else {
        secretWord.innerHTML += `<span> _ </span>`;
      }
    });
  }

  function checkGame() {
    let msg = "";
    const secretWord = <HTMLDivElement>document.querySelector(".secret-word-container");
    const body = document.querySelectorAll(".hanger-body");

    if (body.length == wrongLetter.length) {
      msg = "You lost";
    }

    if (secretWord.innerText == randomWord) {
      msg = "You won";
    }

    if (msg) {
      const msgContent = <HTMLDivElement>document.querySelector("#msg");
      msgContent.innerHTML= msg;
      const popupContent = <HTMLDivElement>document.querySelector(".popup-container");
      popupContent.style.display = "flex";
      // document.querySelector("#msg").innerHTML= msg;
      // document.querySelector(".popup-container").style.display = "flex";
    }
  }

  function showBody() {
    const body = document.querySelectorAll(".hanger-body");
    for (let i = 0; i < wrongLetter.length; i++) {
      (body[i] as HTMLElement).style.display = "block";
    }
  }

  function repeatedLetter() {
    const repeated = <HTMLDivElement>document.querySelector(".alert-repeated-word");
    repeated.classList.add("show");
    setTimeout(() => {
      repeated.classList.remove("show");
    }, 2000);
  }

  function incorrectGuesses() {
    const incorrectGuesses = <HTMLDivElement>document.querySelector(".incorrect-guesses");

    if (wrongLetter.length > 2 && wrongLetter.length <= 4) {
      incorrectGuesses.style.color = "orange";
    } else if (wrongLetter.length > 4) {
      incorrectGuesses.style.color = "red";
    } else {
      incorrectGuesses.style.color = "green";
    }
    incorrectGuesses.innerHTML = `<span>${wrongLetter.length} / 6</span>  `;
  }

  function isLetter(letter: number) {
    if (letter >= 65 && letter <= 90) {
      return true;
    } else {
      return false;
    }
  }

  function lettersButton() {
    const keyboard = <HTMLDivElement>document.querySelector(".keyboard");
    for (let i = 65; i < 91; i++) {
      let letter = String.fromCharCode(i);
      keyboard.innerHTML += `<button class="btn">${letter}</button>`;
    }
    const btn = document.querySelectorAll(".btn");

    btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const letter: string = ( btn as HTMLElement).innerText.toLowerCase();

        if (wrongLetter.includes(letter)) {
          repeatedLetter();
        } else {
          if (wordArray.includes(letter) && !correctLetter.includes(letter)) {
            correctLetter.push(letter);

          } else if (
            !wordArray.includes(letter) &&
            !correctLetter.includes(letter)
          ) {
            wrongLetter.push(letter);
          }
        }
        playGame();
      });
    });
  }
})

function restartGame() {
  window.location.reload();
}


