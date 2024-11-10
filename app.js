let gameSeq = [];
let userSeq = [];
let highScore = 0;

let started = false;
let level = 0;

let btns = ["yellow", "green", "red", "purple"];
let h2 = document.querySelector('h2');

function startGame() {
      if (!started) {
            console.log("Game started");
            started = true;
            levelUp();
      }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame, { once: true });

function btnFlash(btn) {
      btn.classList.add("flash");
      setTimeout(function () {
            btn.classList.remove("flash");
      }, 250);
}

function levelUp() {
      userSeq = [];
      level++;
      h2.innerText = `Level ${level}`;
      let randIdx = Math.floor(Math.random() * 4);
      let randColor = btns[randIdx];
      let randBtn = document.querySelector(`.${randColor}`);
      gameSeq.push(randColor);
      btnFlash(randBtn);
}

function checkAns(idx) {
      if (userSeq[idx] === gameSeq[idx]) {
            if (userSeq.length == gameSeq.length) {
                  setTimeout(levelUp, 1000);
            }
      } else {
            if (highScore < level) {
                  highScore = level;
                  h2.innerText = `Congratulations! New High Score: ${highScore}`;
            } else {
                  h2.innerText = `Game Over! Your score: ${level}. Press any key or tap to restart. High Score: ${highScore}`;
            }

            document.querySelector('body').style.backgroundColor = 'red';
            setTimeout(function () {
                  document.querySelector('body').style.backgroundColor = 'white';
            }, 150);
            reset();
      }
}

function btnPress() {
      let btn = this;
      btnFlash(btn);
      let userColor = btn.getAttribute("id");
      userSeq.push(userColor);
      checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
      btn.addEventListener('click', btnPress);
}

function reset() {
      gameSeq = [];
      userSeq = [];
      level = 0;
      started = false;
      document.addEventListener("touchstart", startGame, { once: true });
}
