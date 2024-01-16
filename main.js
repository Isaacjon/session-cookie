const sessionForm = document.querySelector("#sessionForm");
const cookieForm = document.querySelector("#cookieForm");

function updateSession() {
  const sessionDiv = document.getElementById("session");

  sessionDiv.innerHTML = ""; // Clear existing content
  const currentSessionData =
    JSON.parse(sessionStorage.getItem("sessionForm")) || {};

  sessionDiv.innerHTML += `<p>Username: ${currentSessionData.username || ""}</p>
  <p>Password: ${currentSessionData.password || ""}</p>
  `;
}
// Handle session form submission
sessionForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents the default form action (submitting and reloading the page)

  const formData = new FormData(this); // 'this' refers to the form element
  const formProps = Object.fromEntries(formData);
  sessionStorage.setItem("sessionForm", JSON.stringify(formProps || {}));
  updateSession();

  this.reset(); // Reset the form inputs after submission
});

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to update the cookie display
function updateCookieDisplay() {
  const cookieDiv = document.getElementById("cookie");
  const cookieData = getCookie("cookieForm");

  cookieDiv.innerHTML = ""; // Clear existing content

  // if (cookieData) {
  const data = JSON.parse(cookieData) || {};
  cookieDiv.innerHTML += `<p>Username: ${data.username || ""}</p>
                                <p>Password: ${data.password || ""}</p>`;
  // }
}

// Handle cookie form submission
cookieForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents the default form action

  const formData = new FormData(this);
  const formProps = Object.fromEntries(formData);
  setCookie("cookieForm", JSON.stringify(formProps || {}), 1); // Store for 1 days
  updateCookieDisplay();
  this.reset(); // Reset the form inputs after submission
});

document.addEventListener("DOMContentLoaded", () => {
  updateSession(); // Update session display on page load
  updateCookieDisplay(); // Update cookie display on page load
});
