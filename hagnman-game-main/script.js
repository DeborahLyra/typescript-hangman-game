var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var randomWord = '';
function getWordAndHint() {
    return __awaiter(this, void 0, void 0, function () {
        var resp, data, randomChoice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('words.json')];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, data[Math.floor(Math.random() * data.length)]];
                case 3:
                    randomChoice = _a.sent();
                    return [2 /*return*/, randomChoice];
            }
        });
    });
}
function startGame() {
    return __awaiter(this, void 0, void 0, function () {
        var resp, randomHint, hint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getWordAndHint()];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.word.toLowerCase()];
                case 2:
                    randomWord = _a.sent();
                    console.log(randomWord);
                    return [4 /*yield*/, resp.hint];
                case 3:
                    randomHint = _a.sent();
                    hint = document.querySelector('.hint').innerHTML = "<p class= \"hint-text\">Hint: ".concat(randomHint, "</p>");
                    return [2 /*return*/];
            }
        });
    });
}
startGame().then(function () {
    var wordArray = randomWord.split("");
    var correctLetter = [];
    var wrongLetter = [];
    showCorrectLetters();
    incorrectGuesses();
    lettersButton();
    document.addEventListener("keydown", function (event) {
        var code = event.keyCode;
        if (isLetter(code)) {
            var letter = event.key;
            if (wrongLetter.includes(letter)) {
                repeatedLetter();
            }
            else {
                if (wordArray.includes(letter) && !correctLetter.includes(letter)) {
                    correctLetter.push(letter);
                }
                else if (!wordArray.includes(letter) &&
                    !correctLetter.includes(letter)) {
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
        var wrongLetters = document.querySelector(".wrong-letter");
        wrongLetters.innerHTML = "";
        wrongLetter.forEach(function (letter) {
            wrongLetters.innerHTML += "<span>".concat(letter, "</span>");
        });
    }
    function showCorrectLetters() {
        var secretWord = document.querySelector(".secret-word-container");
        secretWord.innerHTML = "";
        wordArray.forEach(function (letter) {
            if (correctLetter.includes(letter)) {
                secretWord.innerHTML += "<span>".concat(letter, "</span>");
            }
            else {
                secretWord.innerHTML += "<span> _ </span>";
            }
        });
    }
    function checkGame() {
        var msg = "";
        var secretWord = document.querySelector(".secret-word-container");
        var body = document.querySelectorAll(".hanger-body");
        if (body.length == wrongLetter.length) {
            msg = "You lost";
        }
        if (secretWord.innerText == randomWord) {
            msg = "You won";
        }
        if (msg) {
            document.querySelector("#msg").innerHTML = msg;
            document.querySelector(".popup-container").style.display = "flex";
        }
    }
    function showBody() {
        var body = document.querySelectorAll(".hanger-body");
        for (var i = 0; i < wrongLetter.length; i++) {
            body[i].style.display = "block";
        }
    }
    function repeatedLetter() {
        var repeated = document.querySelector(".alert-repeated-word");
        repeated.classList.add("show");
        setTimeout(function () {
            repeated.classList.remove("show");
        }, 2000);
    }
    function incorrectGuesses() {
        var incorrectGuesses = document.querySelector(".incorrect-guesses");
        if (wrongLetter.length > 2 && wrongLetter.length <= 4) {
            incorrectGuesses.style.color = "orange";
        }
        else if (wrongLetter.length > 4) {
            incorrectGuesses.style.color = "red";
        }
        else {
            incorrectGuesses.style.color = "green";
        }
        incorrectGuesses.innerHTML = "<span>".concat(wrongLetter.length, " / 6</span>  ");
    }
    function isLetter(letter) {
        if (letter >= 65 && letter <= 90) {
            return true;
        }
        else {
            return false;
        }
    }
    function lettersButton() {
        var keyboard = document.querySelector(".keyboard");
        for (var i = 65; i < 91; i++) {
            var letter = String.fromCharCode(i);
            keyboard.innerHTML += "<button class=\"btn\">".concat(letter, "</button>");
        }
        var btn = document.querySelectorAll(".btn");
        btn.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var letter = btn.innerText.toLowerCase();
                if (wrongLetter.includes(letter)) {
                    repeatedLetter();
                }
                else {
                    if (wordArray.includes(letter) && !correctLetter.includes(letter)) {
                        correctLetter.push(letter);
                    }
                    else if (!wordArray.includes(letter) &&
                        !correctLetter.includes(letter)) {
                        wrongLetter.push(letter);
                    }
                }
                playGame();
            });
        });
    }
});
function restartGame() {
    window.location.reload();
}
