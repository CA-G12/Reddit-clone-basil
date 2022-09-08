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

const messageHandler = document.querySelector('.message');
const messagePara = document.querySelector('.message p');
const messageSpan = document.querySelector('.message span');

// ====================== Check login ===========================

fetch('/login', {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({
    username: '',
    password: '',
  }),
}).then((res) => res.json()).then((data) => {
  if (data.message === 'loged in') {
    layout.style.display = 'none';
    loginLayout.style.display = 'none';
    signupLayout.style.display = 'none';
    window.location.href = '/home';
  }
});

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
  } else {
    imgUrl.style.outline = '1px solid green';
    message.textContent = '';
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        imgUrl: imgUrl.value,
      }),
    }).then((data) => data.json()).then((req) => {
      if (req.error === 'Username already exists') {
        userName.style.outline = '1px solid red';
        message.textContent = req.error;
        message.style.color = 'red';
      } else if (req.error) {
        messagePara.textContent = req.error;
        messageSpan.classList.add('vanishspan');
        messageHandler.classList.add('vanish');
        messageHandler.style.backgroundColor = '#951b1b';
        messageSpan.style.backgroundColor = '#ff1313';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
      } else if (req.message) {
        messagePara.textContent = req.message;
        messageSpan.classList.add('vanishspan');
        messageHandler.classList.add('vanish');
        messageHandler.style.backgroundColor = '#1b951b';
        messageSpan.style.backgroundColor = '#13ff13';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
        loginLayout.style.display = 'flex';
        signupLayout.style.display = 'none';
        firstName.value = '';
        lastName.value = '';
        userName.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
        imgUrl.value = '';
      }
    });
  }
});

// ======== login user ========
loginBtn.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.layout > #login input');
  const message = document.querySelector('.layout > #login #form p');

  const userName = document.querySelector('.layout > #login #form #login-username');
  const password = document.querySelector('.layout > #login #form #login-password');

  inputs.forEach((e) => {
    if (e.value === '') {
      e.style.outline = '1px solid red';
    } else {
      e.style.outline = '1px solid green';
    }
  });
  if (userName.value.length < 3 || userName.value.length > 30) {
    userName.style.outline = '1px solid red';
    message.textContent = 'Username Must Be Greater Than 3';
    message.style.color = 'red';
  } else if (password.value.length < 7 || password.value.length > 30) {
    password.style.outline = '1px solid red';
    message.textContent = 'Password Must Be Greater Than 7';
    message.style.color = 'red';
  } else {
    message.textContent = '';
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: userName.value,
        password: password.value,
      }),
    }).then((data) => data.json()).then((req) => {
      if (req.error === 'Incorrect username or password') {
        userName.style.outline = '1px solid red';
        password.style.outline = '1px solid red';
        message.textContent = req.error;
        message.style.color = 'red';
        messagePara.textContent = req.error;
        messageSpan.classList.add('vanishspan');
        messageHandler.classList.add('vanish');
        messageHandler.style.backgroundColor = '#951b1b';
        messageSpan.style.backgroundColor = '#ff1313';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
      } else if (req.error) {
        messagePara.textContent = req.error;
        messageSpan.classList.add('vanishspan');
        messageHandler.classList.add('vanish');
        messageHandler.style.backgroundColor = '#951b1b';
        messageSpan.style.backgroundColor = '#ff1313';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
      } else if (req.message === 'success') {
        messagePara.textContent = req.message;
        messageSpan.classList.add('vanishspan');
        messageHandler.classList.add('vanish');
        messageHandler.style.backgroundColor = '#1b951b';
        messageHandler.style.width = '350px';
        messageSpan.style.backgroundColor = '#13ff13';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
          window.location.href = '/home';
        }, 2000);
        loginLayout.style.display = 'none';
        layout.style.display = 'none';
        userName.value = '';
        password.value = '';
      } else if (req.message === 'loged in') {
        layout.style.display = 'none';
        loginLayout.style.display = 'none';
        signupLayout.style.display = 'none';
        window.location.href = '/home';
      }
    });
  }
});
