let currentStep = 0;
let formData = {};
let vars = { showLongForm: false };

function renderStep() {
  const step = window.campaignContent.steps[currentStep];
  const container = document.getElementById("app");
  container.innerHTML = "";

  const totalSteps = window.campaignContent.steps.length;
  const progressPercent = Math.round((currentStep / (totalSteps - 1)) * 100);

  let html = `
    <div class="progress-header">
      <div>
        <div>${step.progressLabel || ""}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${progressPercent}%"></div></div>
      </div>
      ${step.image ? `<img src="${step.image}" class="bike-image" style="max-width:80px"/>` : ""}
    </div>
    <div class="card"><div class="card-content">
  `;

  switch (step.type) {
    case "intro":
      html += `<h1>${step.title}</h1><p>${step.text}</p><button onclick="nextStep()">${step.buttonText}</button>`;
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
      if (step.subtext) html += `<p>${step.subtext}</p>`;
      step.options.forEach(opt => {
        html += `<button class="option-button" onclick="selectAnswer('${step.id}', '${opt}')">${opt}</button>`;
      });
      break;

    case "shortform":
    case "longform":
      if (step.condition && !vars[step.condition.split("==")[0].trim()]) {
        return nextStep(); // sla stap over
      }
      html += `<h2>${step.title}</h2><form id="formStep"><div class="form-section">`;
      step.fields.forEach(f => {
        html += `<label>${f.label}<br/>`;
        if (f.type === "radio") {
          html += `<div class="radio-group">`;
          f.options.forEach(opt => {
            html += `<label><input type="radio" name="${f.id}" value="${opt}"> ${opt}</label>`;
          });
          html += `</div>`;
        } else if (f.type === "dob") {
          html += `
            <div class="form-row">
              <input name="${f.id}_dd" placeholder="DD" maxlength="2" required>
              <input name="${f.id}_mm" placeholder="MM" maxlength="2" required>
              <input name="${f.id}_yyyy" placeholder="JJJJ" maxlength="4" required>
            </div>`;
        } else {
          html += `<input type="${f.type}" name="${f.id}" placeholder="${f.placeholder || ''}" required>`;
        }
        html += `</label><br/>`;
      });
      html += `</div><button type="submit">${step.buttonText || 'Ga Verder'}</button></form>`;
      break;

    case "confirm":
      html += `<h2>${step.title}</h2><p>${step.text}</p><button onclick="finalSubmit()">${step.buttonText}</button><small>${step.note}</small>`;
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
      nextStep();
    });
  }
}

function selectAnswer(id, answer) {
  formData[id] = answer;
  const sponsor = window.campaignContent.sponsors?.find(s => s.triggerStep === id && s.answer === answer);
  if (sponsor && sponsor.setVariable) {
    Object.assign(vars, sponsor.setVariable);
  }
  nextStep();
}

function nextStep() {
  currentStep++;
  if (currentStep >= window.campaignContent.steps.length) {
    renderThankYou();
    return;
  }
  renderStep();
}

function renderThankYou() {
  document.getElementById("app").innerHTML = `
    <div class="card">
      <div class="card-content">
        <h2>Bedankt!</h2>
        <p>Je gegevens zijn succesvol ontvangen. We nemen contact op met de winnaars.</p>
      </div>
    </div>`;
  console.log("Inzending afgerond:", formData);
}

function finalSubmit() {
  console.log("Definitieve bevestiging:", formData);
  nextStep(); // naar bedankt
}

window.addEventListener("DOMContentLoaded", renderStep);
