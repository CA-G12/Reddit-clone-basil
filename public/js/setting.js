const dropDownBtn = document.querySelector('header #drop');
const dropDownMenu = document.querySelector('header #drop-down');
const main = document.querySelector('main');
const statusToggle = document.querySelector('header #drop-down .status-toggle');
const modeToggle = document.querySelector('header #drop-down .mode-toggle');

const updateBtn = document.querySelector('#update #update-btn');

const messageHandler = document.querySelector('.message');
const messagePara = document.querySelector('.message p');
const messageSpan = document.querySelector('.message span');

const firstName = document.querySelector('#update #form #first-name');
const lastName = document.querySelector('#update #form #last-name');
const userName = document.querySelector('#update #form #username');
const email = document.querySelector('#update #form #email');
const imgUrl = document.querySelector('#update #form #profile-img');

// =================== get user data fucntion ==================

function getUserDate() {
  fetch('/user').then((res) => res.json()).then((data) => {
    if (data.userimg) {
      document.querySelector('#drop #profile-info img').src = data.userimg;
      imgUrl.value = data.userimg;
    } else {
      document.querySelector('#drop #profile-info img').src = 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg';
    }
    firstName.value = data.first_name;
    lastName.value = data.last_name;
    userName.value = data.username;
    email.value = data.email;
    document.querySelector('#drop #profile-info p').textContent = data.username;
  });
}

getUserDate();

// =============== update user data function ==================

updateBtn.addEventListener('click', () => {
  const inputs = document.querySelectorAll('#update input');
  const message = document.querySelector('#update #form p');

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
  } else {
    imgUrl.style.outline = '1px solid green';
    message.textContent = '';
    fetch('/updateuser', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        username: userName.value,
        email: email.value,
        imgUrl: imgUrl.value,
      }),
    }).then((data) => data.json()).then((req) => {
      if (req.message === 'no user') {
        window.location.href = '/';
      }
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
        messageHandler.style.width = '350px';
        messageSpan.style.backgroundColor = '#13ff13';
        getUserDate();
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
      }
    });
  }
});

// =================== drop down event funciton ==================

main.addEventListener('click', () => {
  dropDownMenu.style.display = 'none';
});

dropDownBtn.addEventListener('click', () => {
  if (dropDownMenu.style.display === 'none') {
    dropDownMenu.style.display = 'flex';
  } else {
    dropDownMenu.style.display = 'none';
  }
});

// =================== change online status funciton ==================

const status = document.querySelectorAll('.status label');

statusToggle.addEventListener('click', () => {
  const checkedBtn = document.querySelector('#drop-down .status-toggle .checked');
  if (checkedBtn.style.justifyContent === 'flex-end') {
    checkedBtn.style.justifyContent = 'flex-start';
    checkedBtn.style.backgroundColor = '#818181';
    status.forEach((ele) => {
      ele.style.display = 'none';
    });
  } else {
    status.forEach((ele) => {
      ele.style.display = 'block';
    });
    checkedBtn.style.justifyContent = 'flex-end';
    checkedBtn.style.backgroundColor = '#0c8ad9';
  }
});

// =================== change mode funciton ==================

modeToggle.addEventListener('click', () => {
  const checkedBtn = document.querySelector('#drop-down .mode-toggle .checked');
  if (checkedBtn.style.justifyContent === 'flex-end') {
    checkedBtn.style.justifyContent = 'flex-start';
    checkedBtn.style.backgroundColor = '#818181';
  } else {
    checkedBtn.style.justifyContent = 'flex-end';
    checkedBtn.style.backgroundColor = '#0c8ad9';
  }
});

// =================== logout function ===================

const logoutBtn = document.querySelector('header #drop-down #logout');

logoutBtn.addEventListener('click', () => {
  fetch('/logout').then((res) => res.json()).then((data) => {
    if (data.message) {
      messagePara.textContent = data.message;
      messageSpan.classList.add('vanishspan');
      messageHandler.classList.add('vanish');
      messageHandler.style.width = '350px';
      messageHandler.style.backgroundColor = '#1b951b';
      messageSpan.style.backgroundColor = '#13ff13';
      setTimeout(() => {
        messageHandler.classList.remove('vanish');
        messageSpan.classList.remove('vanishspan');
        window.location.href = '/';
      }, 2000);
    }
  });
});

const profileBtn = document.querySelector('header #drop-down #profile');

profileBtn.addEventListener('click', () => {
  window.location.href = '/profile';
});
