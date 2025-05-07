let currentStep = 0;
let formData = {};
let vars = { showLongForm: false };

function renderStep() {
  const step = window.campaignContent.steps[currentStep];
  const container = document.getElementById("app");
  container.innerHTML = "";

  let html = `<div class="card"><div class="card-content">`;

  switch (step.type) {
    case "intro":
      html += `
        <img src="assets/${step.image}" class="bike-image" />
        <h1>${step.title}</h1>
        <p>${step.text}</p>
        <button onclick="nextStep()">${step.buttonText}</button>
      `;
      break;

    case "terms":
      html += `
        <h2>${step.title}</h2>
        <p>${step.text}</p>
        <label class="checkbox-label">
          <input type="checkbox" id="termsCheck" />
          <span>${step.checkboxText}</span>
        </label>
        <button id="termsBtn" disabled>${step.buttonText}</button>
      `;
      break;

    case "question":
      html += `<h2>${step.text}</h2>`;
      step.options.forEach(opt => {
        html += `<button onclick="selectAnswer('${step.id}', '${opt}')">${opt}</button>`;
      });
      break;

    case "shortform":
    case "longform":
      if (step.condition && !vars[step.condition.split("==")[0].trim()]) {
        return nextStep(); // sla deze stap over
      }
      html += `<h2>Vul je gegevens in</h2>`;
      html += `<form id="formStep">`;
      step.fields.forEach(f => {
        html += `<label>${f.label}<br/>`;
        if (f.type === "select") {
          html += `<select name="${f.id}">${f.options.map(o => `<option value="${o}">${o}</option>`)}</select>`;
        } else {
          html += `<input type="${f.type}" name="${f.id}" required />`;
        }
        html += `</label><br/>`;
      });
      html += `<button type="submit">Verzenden</button></form>`;
      break;
  }

  html += `</div></div>`;
  container.innerHTML = html;

  if (step.type === "terms") {
    document.getElementById("termsCheck").addEventListener("change", e => {
      document.getElementById("termsBtn").disabled = !e.target.checked;
    });
    document.getElementById("termsBtn").addEventListener("click", nextStep);
  }

  if (step.type === "shortform" || step.type === "longform") {
    document.getElementById("formStep").addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(e.target);
      for (const [key, val] of data.entries()) {
        formData[key] = val;
      }
      console.log("Form data:", formData);
      nextStep();
    });
  }
}

function selectAnswer(id, answer) {
  formData[id] = answer;
  const sponsor = window.campaignContent.sponsors.find(s => s.triggerStep === id && s.answer === answer);
  if (sponsor && sponsor.setVariable) {
    Object.assign(vars, sponsor.setVariable);
  }
  nextStep();
}

function nextStep() {
  currentStep++;
  if (currentStep >= window.campaignContent.steps.length) {
    document.getElementById("app").innerHTML = `<div class="card"><div class="card-content"><h2>Bedankt!</h2><p>Je deelname is succesvol geregistreerd.</p></div></div>`;
    return;
  }
  renderStep();
}

window.addEventListener("DOMContentLoaded", renderStep);
