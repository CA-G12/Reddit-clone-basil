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

// ====================== create posts ===========================

function handleDom(data) {
  const postsContainer = document.querySelector('#posts');
  data.forEach((obj) => {
    const post = document.createElement('div');
    post.classList = 'post';

    const voteDiv = document.createElement('div');
    voteDiv.id = 'vote';
    const votePlus = document.createElement('i');
    votePlus.classList = 'fa-solid fa-chevron-up';
    const voteNumber = document.createElement('p');
    voteNumber.textContent = obj.likenum;
    const voteMinus = document.createElement('i');
    voteMinus.classList = 'fa-solid fa-chevron-down';
    voteDiv.appendChild(votePlus);
    voteDiv.appendChild(voteNumber);
    voteDiv.appendChild(voteMinus);
    post.appendChild(voteDiv);

    votePlus.addEventListener('click', () => {
      layout.style.display = 'flex';
      loginLayout.style.display = 'flex';
      signupLayout.style.display = 'none';
    });

    voteMinus.addEventListener('click', () => {
      layout.style.display = 'flex';
      loginLayout.style.display = 'flex';
      signupLayout.style.display = 'none';
    });

    const container = document.createElement('div');
    container.classList = 'container';

    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList = 'user-info';
    const statusDiv = document.createElement('div');
    statusDiv.classList = 'status';
    const userImg = document.createElement('img');
    if (obj.userimg) {
      userImg.src = obj.userimg;
      userImg.alt = obj.username;
    } else {
      userImg.src = 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg';
      userImg.alt = 'placeholder';
    }
    statusDiv.appendChild(userImg);
    userInfoDiv.appendChild(statusDiv);
    const postUsername = document.createElement('h3');
    postUsername.textContent = obj.username;
    const postDate = document.createElement('p');
    const postDateTime = obj.postdate.split('T')[0];
    postDate.textContent = `Posted by ${obj.username} ${postDateTime}`;
    userInfoDiv.appendChild(postUsername);
    userInfoDiv.appendChild(postDate);
    container.appendChild(userInfoDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList = 'content';
    const postContent = document.createElement('p');
    postContent.textContent = obj.post;
    contentDiv.appendChild(postContent);
    container.appendChild(contentDiv);
    if (obj.postimg) {
      const postImgDiv = document.createElement('div');
      postImgDiv.classList = 'img';
      const postImg = document.createElement('img');
      postImg.src = obj.postimg;
      postImg.alt = obj.username;
      postImgDiv.appendChild(postImg);
      container.appendChild(postImgDiv);
    }

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList = 'buttons';
    const commentBtn = document.createElement('button');
    commentBtn.id = 'comment';
    commentBtn.innerHTML = '<i class="fa-regular fa-message"></i> Comments';
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save';
    saveBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Save';
    buttonsDiv.appendChild(commentBtn);
    buttonsDiv.appendChild(saveBtn);
    container.appendChild(buttonsDiv);

    const commentDivContainer = document.createElement('div');
    commentDivContainer.classList = 'comments';
    commentDivContainer.style.display = 'none';
    container.appendChild(commentDivContainer);
    const commentFeild = document.createElement('div');
    commentFeild.classList = 'comment-feild';
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Enter Your Comment Here';
    const commentSubmetBtn = document.createElement('button');
    commentSubmetBtn.textContent = 'comment';
    commentFeild.appendChild(commentInput);
    commentFeild.appendChild(commentSubmetBtn);
    commentDivContainer.appendChild(commentFeild);
    commentSubmetBtn.addEventListener('click', () => {
      layout.style.display = 'flex';
      loginLayout.style.display = 'flex';
      signupLayout.style.display = 'none';
    });

    const commentContainer = document.createElement('div');
    commentContainer.classList = 'comment-container';
    commentContainer.style.display = 'none';
    commentDivContainer.appendChild(commentContainer);

    commentBtn.addEventListener('click', () => {
      if (commentDivContainer.style.display === 'flex') {
        commentDivContainer.style.display = 'none';
        commentContainer.style.display = 'none';
        commentContainer.textContent = '';
      } else {
        commentDivContainer.style.display = 'flex';
        commentContainer.style.display = 'flex';
        fetch(`/comments/${obj.id}`).then((res) => res.json()).then((result) => {
          result.forEach((ele) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList = 'comment';
            commentContainer.appendChild(commentDiv);

            const imgNameDiv = document.createElement('div');
            imgNameDiv.classList = 'information';
            const imgDiv = document.createElement('div');
            imgDiv.classList = 'user-img';
            const img = document.createElement('img');
            if (ele.userImg) {
              img.src = ele.userImg;
              img.alt = ele.username;
            } else {
              img.src = 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg';
              img.alt = 'placeholder';
            }
            const userH2 = document.createElement('h2');
            userH2.textContent = ele.username;
            imgDiv.appendChild(img);
            imgNameDiv.appendChild(imgDiv);
            imgNameDiv.appendChild(userH2);
            commentDiv.appendChild(imgNameDiv);
            const contentPara = document.createElement('p');
            contentPara.textContent = ele.content;
            commentDiv.appendChild(contentPara);
          });
        });
      }
    });

    post.appendChild(container);
    postsContainer.appendChild(post);
  });
}

// ===================== handle comments function ==================

// function handleComments(id, container) {
//   console.log(container);
//   return container;
// }

// =================== create posts fetch ============================

fetch('/posts').then((res) => res.json()).then((data) => {
  handleDom(data);
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
        status: 'online',
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
