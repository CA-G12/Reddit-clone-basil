const headerLoginBtn = document.querySelector("header #login");
const headerSignupBtn = document.querySelector("header #signup");
const layout = document.querySelector(".layout");
const signupLayout = document.querySelector(".layout #signup");
const cancelSignupLayout = document.querySelector(".layout #signup #cancel");

headerSignupBtn.addEventListener("click", () => {
  layout.style.display = "flex";
  signupLayout.style.display = "flex";
});

cancelSignupLayout.addEventListener("click", () => {
  layout.style.display = "none";
  signupLayout.style.display = "none";
});
