const layout = document.querySelector('.layout');

const headerLoginBtn = document.querySelector('header #login');
const headerSignupBtn = document.querySelector('header #signup');

const signupLayout = document.querySelector('.layout > #signup');
const loginLayout = document.querySelector('.layout > #login');

const cancelSignupLayout = document.querySelector('.layout > #signup #cancel');
const cancelLoginLayout = document.querySelector('.layout > #login #cancel');

const loginSpanBtn = document.querySelector(
  '.layout > #signup span#login-span',
);
const signupSpanBtn = document.querySelector(
  '.layout > #login span#signup-span',
);

const loginBtn = document.querySelector('.layout > #login #login-btn');
const signupBtn = document.querySelector('.layout > #signup #signup-btn');

headerSignupBtn.addEventListener('click', () => {
  layout.style.display = 'flex';
  signupLayout.style.display = 'flex';
  loginLayout.style.display = 'none';
});

headerLoginBtn.addEventListener('click', () => {
  layout.style.display = 'flex';
  loginLayout.style.display = 'flex';
  signupLayout.style.display = 'none';
});

cancelSignupLayout.addEventListener('click', () => {
  layout.style.display = 'none';
  signupLayout.style.display = 'none';
  loginLayout.style.display = 'none';
});

cancelLoginLayout.addEventListener('click', () => {
  layout.style.display = 'none';
  signupLayout.style.display = 'none';
  loginLayout.style.display = 'none';
});

loginSpanBtn.addEventListener('click', () => {
  layout.style.display = 'flex';
  signupLayout.style.display = 'none';
  loginLayout.style.display = 'flex';
});

signupSpanBtn.addEventListener('click', () => {
  layout.style.display = 'flex';
  signupLayout.style.display = 'flex';
  loginLayout.style.display = 'none';
});

// ======== create new user ========

signupBtn.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.layout > #signup input');
  const message = document.querySelector('.layout > #signup #form p');

  const firstName = document.querySelector('.layout > #signup #form #first-name');
  const lastName = document.querySelector('.layout > #signup #form #last-name');
  const userName = document.querySelector('.layout > #signup #form #username');
  const email = document.querySelector('.layout > #signup #form #email');
  const password = document.querySelector('.layout > #signup #form #password');
  const confirmPassword = document.querySelector('.layout > #signup #form #confirm-password');
  const imgUrl = document.querySelector('.layout > #signup #form #profile-img');

  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  inputs.forEach((e) => {
    if (e.value === '') {
      e.style.outline = '1px solid red';
    } else {
      e.style.outline = '1px solid green';
    }
  });
  if (firstName.value === '') {
    firstName.style.outline = '1px solid red';
    message.textContent = 'First Name Required';
    message.style.color = 'red';
  } else if (lastName.value === '') {
    lastName.style.outline = '1px solid red';
    message.textContent = 'Last Name Required';
    message.style.color = 'red';
  } else if (userName.value.length < 3 || userName.value.length > 30) {
    userName.style.outline = '1px solid red';
    message.textContent = 'Username Must Be Greater Than 3';
    message.style.color = 'red';
  } else if (email.value === '' || !re.test(email.value)) {
    email.style.outline = '1px solid red';
    message.textContent = 'Email Required';
    message.style.color = 'red';
  } else if (password.value.length < 7 || password.value.length > 30) {
    password.style.outline = '1px solid red';
    message.textContent = 'Password Must Be Greater Than 7';
    message.style.color = 'red';
  } else if (password.value !== confirmPassword.value) {
    password.style.outline = '1px solid red';
    confirmPassword.style.outline = '1px solid red';
    message.textContent = 'Confirm Password Must Equal Password';
    message.style.color = 'red';
  } else if (imgUrl.value >= 0) {
    imgUrl.style.outline = '1px solid green';
    message.textContent = '';
  } else {
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        firstName, lastName, userName, email, password, confirmPassword, imgUrl,
      }),
    });
  }
});

// ======== login user ========

loginBtn.addEventListener('click', () => {});
