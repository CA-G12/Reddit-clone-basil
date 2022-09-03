const headerLoginBtn = document.querySelector("header #login");
const headerSignupBtn = document.querySelector("header #signup");
const layout = document.querySelector(".layout");
const signupLayout = document.querySelector(".layout > #signup");
const loginLayout = document.querySelector(".layout > #login");
const cancelSignupLayout = document.querySelector(".layout > #signup #cancel");
const cancelLoginLayout = document.querySelector(".layout > #login #cancel");
const loginSpanBtn = document.querySelector(
  ".layout > #signup span#login-span"
);
const signupSpanBtn = document.querySelector(
  ".layout > #login span#signup-span"
);

headerSignupBtn.addEventListener("click", () => {
  layout.style.display = "flex";
  signupLayout.style.display = "flex";
  loginLayout.style.display = "none";
});

headerLoginBtn.addEventListener("click", () => {
  layout.style.display = "flex";
  loginLayout.style.display = "flex";
  signupLayout.style.display = "none";
});

cancelSignupLayout.addEventListener("click", () => {
  layout.style.display = "none";
  signupLayout.style.display = "none";
  loginLayout.style.display = "none";
});

cancelLoginLayout.addEventListener("click", () => {
  layout.style.display = "none";
  signupLayout.style.display = "none";
  loginLayout.style.display = "none";
});

loginSpanBtn.addEventListener("click", () => {
  layout.style.display = "flex";
  signupLayout.style.display = "none";
  loginLayout.style.display = "flex";
});

signupSpanBtn.addEventListener("click", () => {
  layout.style.display = "flex";
  signupLayout.style.display = "flex";
  loginLayout.style.display = "none";
});
