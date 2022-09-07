const dropDownBtn = document.querySelector('header #drop');
const dropDownMenu = document.querySelector('header #drop-down');
const main = document.querySelector('main');
const statusToggle = document.querySelector('header #drop-down .status-toggle');
const modeToggle = document.querySelector('header #drop-down .mode-toggle');
const logout = document.querySelector('header #drop-down #logout');
const status = document.querySelectorAll('.status label');

const messageHandler = document.querySelector('.message');
const messagePara = document.querySelector('.message p');
const messageSpan = document.querySelector('.message span');

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

logout.addEventListener('click', () => {
  fetch('/logout');
});

// ============ Create post functions ===================

const layout = document.querySelector('.layout');
const layer = document.querySelector('.layout .layer');
const postBtn = document.querySelector('.layout #form #post');
const postInput = document.querySelector('#add-post #post-input');

postInput.addEventListener('click', () => {
  layout.style.display = 'flex';
});

layer.addEventListener('click', () => {
  layout.style.display = 'none';
});

postBtn.addEventListener('click', () => {
  const content = document.querySelector('.layout #form textarea');
  const postImg = document.querySelector('.layout #form input');
  if (content.value !== '') {
    fetch('/addpost', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        content: content.value,
        postImg: postImg.value,
      }),
    }).then((res) => res.json()).then((data) => {
      if (data.message === 'Created Post Successfuly') {
        messagePara.textContent = data.message;
        messageSpan.classList.add('vanishspan');
        messageHandler.classList.add('vanish');
        messageHandler.style.backgroundColor = '#1b951b';
        messageSpan.style.backgroundColor = '#13ff13';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
        layout.style.display = 'none';
        content.value = '';
        postImg.value = '';
      }
    });
    layout.style.display = 'none';
  } else {
    content.style.outline = '2px solid red';
  }
});
