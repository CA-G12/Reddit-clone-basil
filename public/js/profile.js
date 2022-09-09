const dropDownBtn = document.querySelector('header #drop');
const dropDownMenu = document.querySelector('header #drop-down');
const main = document.querySelector('main');
const statusToggle = document.querySelector('header #drop-down .status-toggle');
const modeToggle = document.querySelector('header #drop-down .mode-toggle');

const messageHandler = document.querySelector('.message');
const messagePara = document.querySelector('.message p');
const messageSpan = document.querySelector('.message span');

// ================ add like function ===================
function addLike(id) {
  fetch(`/like/add/${id}`, {
    method: 'POST',
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.message === 'success') {
        createPosts();
      }
    });
}
// ============== remove like function ==================

function downLike(id) {
  fetch(`/like/down/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.message === 'success') {
        createPosts();
      }
    });
}

// ================= get user data function ======================

fetch('/user').then((res) => res.json()).then((data) => {
  if (data.userimg) {
    document.querySelector('#drop #profile-info img').src = data.userimg;
    document.querySelector('#drop #profile-info img').alt = `${data.first_name} ${data.last_name}`;
    document.querySelector('#header .profile-img img').src = data.userimg;
    document.querySelector('#header .profile-img img').alt = `${data.first_name} ${data.last_name}`;
    document.querySelector('#add-post .status img').alt = `${data.first_name} ${data.last_name}`;
    document.querySelector('#add-post .status img').src = data.userimg;
  } else {
    document.querySelector('#drop #profile-info img').src = 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg';
    document.querySelector('#drop #profile-info img').alt = 'placeholder';
    document.querySelector('#header .profile-img img').src = 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg';
    document.querySelector('#header .profile-img img').alt = 'placeholder';
    document.querySelector('#add-post .status img').src = 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg';
    document.querySelector('#add-post .status img').alt = 'placeholder';
  }
  document.querySelector('#drop #profile-info p').textContent = data.username;
  document.querySelector('#header .profile-info h2').textContent = `${data.first_name} ${data.last_name}`;
});

// ================ delete post funciton =====================

function deletePost(id) {
  fetch(`/delete/post/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'Post deleted successfuly') {
        messagePara.textContent = data.message;
        messageSpan.classList.add('vanishspan');
        messageHandler.classList.add('vanish');
        messageHandler.style.width = '350px';
        messageHandler.style.backgroundColor = '#1b951b';
        messageSpan.style.backgroundColor = '#13ff13';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
        createPosts();
      }
    });
}

// ================== handle posts function =================

function handleDom(data) {
  const postsContainer = document.querySelector('#posts');
  document.querySelector('#header .profile-info p').textContent = `post: ${data.length}`;
  postsContainer.textContent = '';
  data.reverse().forEach((obj) => {
    const post = document.createElement('div');
    const deleteBtn = document.createElement('i');
    deleteBtn.classList = 'fa-solid fa-xmark';
    post.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      deletePost(obj.id);
    });
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
      addLike(obj.id);
    });

    voteMinus.addEventListener('click', () => {
      downLike(obj.id);
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
    const statusLabel = document.createElement('label');
    statusLabel.style.display = 'block';
    statusDiv.appendChild(statusLabel);
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

    post.appendChild(container);
    postsContainer.appendChild(post);
  });
}

function createPosts() {
  fetch('/user-posts').then((res) => res.json()).then((data) => {
    if (data.length === 0) {
      const postsContainer = document.querySelector('#posts');
      postsContainer.textContent = 'No Post Result!';
    } else {
      handleDom(data);
    }
  });
}

createPosts();

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

// ============== add new post function =======================

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
        messageHandler.style.width = '350px';
        messageHandler.style.backgroundColor = '#1b951b';
        messageSpan.style.backgroundColor = '#13ff13';
        setTimeout(() => {
          messageHandler.classList.remove('vanish');
          messageSpan.classList.remove('vanishspan');
        }, 2000);
        layout.style.display = 'none';
        content.value = '';
        postImg.value = '';
        createPosts();
      }
    });
    layout.style.display = 'none';
  } else {
    content.style.outline = '2px solid red';
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

// =============== go to profile page function ===============

const profileBtn = document.querySelector('header #drop-down #profile');

profileBtn.addEventListener('click', () => {
  window.location.href = '/profile';
});

// =============== go to setting page function ===============

const settingBtn = document.querySelector('header #drop-down #setting');

settingBtn.addEventListener('click', () => {
  window.location.href = '/update';
});
