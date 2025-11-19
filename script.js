let questions = [];
let index = 0;
let selected = null;

async function loadQuestions() {
  const res = await fetch("questions.json");
  questions = await res.json();
  renderQuestion();
}

function renderQuestion() {
  const q = questions[index];

  document.getElementById("question-number").innerText = `Question ${
    index + 1
  } of ${questions.length}`;
  document.getElementById("question-text").innerText = q.question;

  const optionsDiv = document.getElementById("options-container");
  optionsDiv.innerHTML = "";

  const opts = shuffle([q.correct, q.wrong]);

  opts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;

    btn.onclick = () => handleSelection(btn, opt, q.correct, q.reasoning);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("reasoning-box").classList.add("hidden");
  document.getElementById("next-btn").classList.add("hidden");
}

function handleSelection(btn, opt, correct, reasoning) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((b) => b.classList.remove("selected"));

  btn.classList.add("selected");
  selected = opt;

  // Lock and reveal correctness
  buttons.forEach((b) => (b.disabled = true));

  if (opt === correct) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    buttons.forEach((b) => {
      if (b.innerText === correct) b.classList.add("correct");
    });
  }

  // Show reasoning
  const reasonBox = document.getElementById("reasoning-box");
  reasonBox.innerText = "Reasoning: " + reasoning;
  reasonBox.classList.remove("hidden");

  // Show next button
  const nextBtn = document.getElementById("next-btn");
  nextBtn.classList.remove("hidden");

  nextBtn.onclick = nextQuestion;
}

function nextQuestion() {
  index++;
  if (index < questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById("quiz-box").innerHTML = `
		<h2 style="text-align:center; font-size:24px; margin-bottom:10px;">Quiz Completed!</h2>
		<p style="text-align:center; color:#666;">Great job! You’ve finished all questions.</p>
	`;
}

// Utility: Shuffle array
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

loadQuestions();
