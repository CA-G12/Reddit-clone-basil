const dropDownBtn = document.querySelector('header #drop');
const dropDownMenu = document.querySelector('header #drop-down');
const main = document.querySelector('main');
const statusToggle = document.querySelector('header #drop-down .status-toggle');
const modeToggle = document.querySelector('header #drop-down .mode-toggle');
const logout = document.querySelector('header #drop-down #logout');
const status = document.querySelectorAll('.status label');

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
