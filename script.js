// Retrieve the ball element
var ball = document.getElementById("ball");

// Set initial position and velocity of the ball
var ballPosition = { x: 49, y: 3.4 };
var ballVelocity = { x: 1, y: 1 };

// Retrieve the rod elements
var rod1 = document.getElementById("Rod1");
var rod2 = document.getElementById("Rod2");

// Initialize variables for rod movement
var w = rod1.offsetLeft;
var Xaxix = 0;

// Store the scores of both Rods
var Rod1Score = 0;
var Rod2Score = 0;

// Store the winner information
var winner;
var winnerScore;

// Max score Details
var maxScore = 0;
var MaxScoreRod = "Rod1";

// Game Status
var GameRunning = false;

// Check for stored rod and score data in local storage
if (!localStorage.getItem("MaxScoreRod") && !localStorage.getItem("maxScore")) {
  localStorage.setItem("MaxScoreRod", MaxScoreRod);
  localStorage.setItem("maxScore", maxScore);
}

window.alert(
  `${localStorage.getItem(
    "MaxScoreRod"
  )} has maximum score of ${localStorage.getItem("maxScore")}`
);

// function to reset the game

function resetGame() {
  GameRunning = false;
  Rod1Score = 0;
  Rod2Score = 0;
  Xaxix = 0;
  ballPosition = { x: 49, y: 3.4 };
  ballVelocity = { x: 1, y: 1 };
  rod1.style.transform = "translateX(" + Xaxix + "px)";
  rod2.style.transform = "translateX(" + Xaxix + "px)";
  ball.style.left = ballPosition.x + "%";
  ball.style.top = ballPosition.y + "%";
}

// Function to update the position of the ball
function updateBallPosition() {
  // Update the ball's position based on its velocity
  ballPosition.x += ballVelocity.x;
  ballPosition.y += ballVelocity.y;

  // Update the ball's CSS position
  ball.style.left = ballPosition.x + "%";
  ball.style.top = ballPosition.y + "%";

  // Check for collisions with side walls
  if (ballPosition.x <= 0 || ballPosition.x >= 98) {
    ballVelocity.x *= -1; // Reverse the x velocity
  }

  // Check for collisions with upper and lowers walls
  if (ballPosition.y <= 0 || ballPosition.y >= 96) {
    if (ballPosition.y <= 0) {
      winner = "Rod2";
      winnerScore = Rod2Score;
    }
    if (ballPosition.y >= 96) {
      winner = "Rod1";
      winnerScore = Rod1Score;
    }

    if (winnerScore > maxScore) {
      maxScore = winnerScore;
      MaxScoreRod = winner;
      localStorage.setItem("MaxScoreRod", MaxScoreRod);
      localStorage.setItem("maxScore", maxScore);
    }

    window.alert(
      `${winner} wins with a score of ${winnerScore}.Max score is ${maxScore}`
    );

    resetGame();
    return;
  }

  // Check for collisions with rods
  var rod1Rect = rod1.getBoundingClientRect();
  var rod2Rect = rod2.getBoundingClientRect();
  var ballRect = ball.getBoundingClientRect();

  if (
    ballRect.bottom >= rod1Rect.top &&
    ballRect.top <= rod1Rect.bottom &&
    ballRect.left >= rod1Rect.left &&
    ballRect.right <= rod1Rect.right
  ) {
    // Collision with rod1
    Rod1Score += 100;
    ballVelocity.y *= -1; // Reverse the y velocity
  }

  if (
    ballRect.bottom >= rod2Rect.top &&
    ballRect.top <= rod2Rect.bottom &&
    ballRect.left >= rod2Rect.left &&
    ballRect.right <= rod2Rect.right
  ) {
    // Collision with rod2
    Rod2Score += 100;
    ballVelocity.y *= -1; // Reverse the y velocity
  }

  // Request the next animation frame to continue the game loop
  requestAnimationFrame(updateBallPosition);
}

// Function to handle keypress events
function startGame(event) {
  if (event.key === "Enter" && !GameRunning) {
    console.log("2");
    GameRunning = true;

    // Start the game loop
    updateBallPosition();
  }
  if (event.key === "a" || event.key === "A") {
    Xaxix -= 50;

    if (Xaxix < -w) {
      Xaxix += 50;
      return;
    }

    rod1.style.transform = "translateX(" + Xaxix + "px)";
    rod2.style.transform = "translateX(" + Xaxix + "px)";
  }

  if (event.key === "d" || event.key === "D") {
    Xaxix += 50;

    if (Xaxix > w) {
      Xaxix -= 50;
      return;
    }

    rod1.style.transform = "translateX(" + Xaxix + "px)";
    rod2.style.transform = "translateX(" + Xaxix + "px)";
  }
}

// Add event listener for keypress events
document.addEventListener("keypress", startGame);
