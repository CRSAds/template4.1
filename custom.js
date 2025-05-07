function showStep(stepNumber) {
  document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
  document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
}

window.addEventListener("DOMContentLoaded", () => {
  const c = window.campaignContent;

  // Stap 1 content
  document.getElementById("step1-title").innerText = c.step1.title;
  document.getElementById("step1-image").src = c.step1.image;
  document.getElementById("step1-desc").innerText = c.step1.description;
  document.getElementById("nextBtn").innerText = c.step1.buttonText;

  // Stap 2 content
  document.getElementById("step2-title").innerText = c.step2.title;
  document.getElementById("step2-content").innerHTML = c.step2.contentHtml;
  document.getElementById("termsLabel").innerText = c.step2.checkboxText;
  document.getElementById("proceedBtn").innerText = c.step2.buttonText;

  // Event listeners
  document.getElementById("nextBtn").addEventListener("click", () => {
    showStep(2);
  });

  const termsCheck = document.getElementById("termsCheck");
  const proceedBtn = document.getElementById("proceedBtn");
  const optOutLink = document.getElementById("step2-content").querySelector("#optOut");
  const viewSponsors = document.getElementById("step2-content").querySelector("#viewSponsors");

  termsCheck.addEventListener("change", () => {
    proceedBtn.disabled = !termsCheck.checked;
  });

  optOutLink?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("U heeft gekozen om verder te gaan zonder gegevensdeling.");
    proceedBtn.disabled = false;
  });

  viewSponsors?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Hier zou een sponsoren-popup komen.");
  });

  proceedBtn.addEventListener("click", () => {
    alert("Volgende stap!");
  });
});
