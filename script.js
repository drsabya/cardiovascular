let questions = [];
let index = 0;
let selected = null;
let userAnswers = [];

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

  // Update progress bar
  document.getElementById("progress-bar").style.width = `${
    (index / questions.length) * 100
  }%`;

  // Options
  const optionsDiv = document.getElementById("options-container");
  optionsDiv.innerHTML = "";
  const opts = shuffle([q.correct, q.wrong]);

  opts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;

    btn.onclick = () => handleSelection(btn, opt, q.correct);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback-box").classList.add("hidden");
  document.getElementById("next-btn").classList.add("hidden");

  // Show back button only if not first question
  document.getElementById("back-btn").classList.toggle("hidden", index === 0);
}

function handleSelection(btn, opt, correct) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((b) => (b.disabled = true));

  if (opt === correct) {
    btn.classList.add("correct");
    document.getElementById("feedback-box").innerText = "Correct!";
    userAnswers[index] = true;
  } else {
    btn.classList.add("wrong");
    buttons.forEach((b) => {
      if (b.innerText === correct) b.classList.add("correct");
    });
    document.getElementById("feedback-box").innerText = "Incorrect.";
    userAnswers[index] = false;
  }

  document.getElementById("feedback-box").classList.remove("hidden");
  document.getElementById("next-btn").classList.remove("hidden");

  document.getElementById("next-btn").onclick = nextQuestion;
  document.getElementById("back-btn").onclick = backQuestion;
}

function nextQuestion() {
  index++;
  if (index < questions.length) {
    renderQuestion();
  } else {
    completeQuiz();
  }
}

function backQuestion() {
  if (index > 0) {
    index--;
    renderQuestion();
  }
}

function completeQuiz() {
  document.getElementById("quiz-box").innerHTML = `
		<h2 style="text-align:center;">Quiz Complete</h2>
		<p style="text-align:center; color:#555;">
			You have reached the end of the quiz.
		</p>
		<p style="text-align:center; margin-top:15px;">
			<a href="answers.html" style="color:#007aff; font-weight:600;">
			View Answers & Reasoning</a>
		</p>
	`;

  // Fill progress bar fully
  document.getElementById("progress-bar").style.width = "100%";
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

loadQuestions();
