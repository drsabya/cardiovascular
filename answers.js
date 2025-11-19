async function loadAnswers() {
  const res = await fetch("questions.json");
  const questions = await res.json();

  const container = document.getElementById("answers-list");
  container.innerHTML = "";

  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "answer-card";
    card.style.cssText = `
			background:#fff; padding:18px; border-radius:14px;
			box-shadow:0 4px 14px rgba(0,0,0,0.07); margin-bottom:16px;
		`;

    card.innerHTML = `
			<div style="font-size:15px; color:#666; margin-bottom:5px;">Question ${
        i + 1
      }</div>
			<div style="font-size:18px; font-weight:600; margin-bottom:8px;">${
        q.question
      }</div>
			<div><strong>Correct:</strong> ${q.correct}</div>
			<div style="margin-top:8px; font-size:15px; color:#444;">
				<strong>Reasoning:</strong> ${q.reasoning}
			</div>
		`;

    container.appendChild(card);
  });
}

loadAnswers();
