// Waitlist section interactivity

async function sendEmail(email) {
  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNTU4OWU5YmZlMmRiNTViMjA0NGNlZDYxN2QzZDhkNjdmODY2NjdjZDAyNmMzMTA2NTUwZDUyNjEwMjdjMzU3Y2M1MDk4MDFhN2M5ZTc2YWUiLCJpYXQiOjE3NTI5NDkxMzcuODU1MDQyLCJuYmYiOjE3NTI5NDkxMzcuODU1MDQ0LCJleHAiOjQ5MDg2MjI3MzcuODUxMDc2LCJzdWIiOiIxNjkwODY3Iiwic2NvcGVzIjpbXX0.YZ1EhXPQjgolbElDvJyQhBA4XqYFyDBGEOo9Dqq_-VJSjyvkQ6d5ya4N0r5Evl5qLOfV5lZbDjBjNhon2-3x-8GnyY3VJrrskdj5qBPnXz8xBEqFlsiCdUGdlimMqEzZ7f5D1Xt6DoVBJcOCWeYU0JKjgWVg5qKsTaM9wIf9Enhph94-V2e-1I43qzj1vW-21F1xxJ_KCUuAtLaL22RKMHlIZOSnWg-iX7UeEqHLbTMoijmdoNvTwWQyuVT5yILMlSoyAF4ccgv-Qh5HpzAa-CcDUT5sYSevI40pPAarhVZjxXzEF0NIFdmiPxBt5Cjpu0I5POqoadGDhxE4qj4JCkCOPOxDXoWd2-auwYxz2yXJGjQF0loOkqlDYe_5i4kuV6jSDn6ZeQrC_CVgvWPq0-i0z7MdOaHCP9plghDxY-3AXBBp5Xva9g3ZFTqMWKITsNyuFr3XaZkuUwsfKPeOzXIHLr0rH3WoSWyH2bUNJV6vPp8-y1teGUxe9rUJCp9ZHwOEYC8IdthBZbi_G_F9nZ3CV_bpsRQWpUjvQGCV4A6Xg3DT20fTQ-KgJCTy7eN6_uPqdqXl5Mzs146LE18iHF6KmLy6F5LSWshI42n-m6fFaw5wfiLm7QBwUhBllgddoSUf0EHgB8FRrfJ4iFG_CGvqz73I3OgTX3NXsfWhsLY',
      },
      body: JSON.stringify({
        email,
        name: 'Forextainment Waitlist',
        groups: ['160378852328081233']
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Added to waitlist:", result);
      // alert("You're successfully added to the waitlist!");
    } else {
      console.error("MailerLite Error:", result);
      alert("There was an issue. Please try again.");
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Connection issue. Please try again later.");
  }
}

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
   console.log("Submitting email:", emailInput.value);
    const email = emailInput.value;
    sendEmail(email)

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