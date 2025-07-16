// Waitlist section interactivity

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("waitlist-form");
  const emailInput = document.getElementById("waitlist-email");
  const submitBtn = document.getElementById("waitlist-submit");
  const loadingDiv = document.getElementById("waitlist-loading");
  const successDiv = document.getElementById("waitlist-success");
  const resetBtn = document.getElementById("waitlist-reset");

  // Step indicators
  const stepCircles = [
    document.getElementById("step-circle-1"),
    document.getElementById("step-circle-2"),
    document.getElementById("step-circle-3"),
  ];
  const stepLabels = [
    document.getElementById("step-label-1"),
    document.getElementById("step-label-2"),
    document.getElementById("step-label-3"),
  ];
  const connectors = document.querySelectorAll(".waitlist-connector");

  function setStep(step) {
    // Update step visuals
    for (let i = 0; i < 3; i++) {
      const stepDiv = document.querySelectorAll(".waitlist-step")[i];
      if (step > i + 1) {
        stepDiv.classList.add("completed");
        stepDiv.classList.remove("active");
        connectors[i] && connectors[i].classList.add("active");
      } else if (step === i + 1) {
        stepDiv.classList.add("active");
        stepDiv.classList.remove("completed");
        connectors[i] && connectors[i].classList.remove("active");
      } else {
        stepDiv.classList.remove("active", "completed");
        connectors[i] && connectors[i].classList.remove("active");
      }
    }
    // Show/hide content
    form.style.display = step === 1 ? "block" : "none";
    loadingDiv.style.display = step === 2 ? "block" : "none";
    successDiv.style.display = step === 3 ? "block" : "none";
  }

  setStep(1);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!emailInput.value) return;
    submitBtn.disabled = true;
    setStep(2);

    setTimeout(() => {
      setStep(3);
      submitBtn.disabled = false;
    }, 2000);
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      emailInput.value = "";
      setStep(1);
    });
  }
});