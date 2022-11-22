const logouBtn = document.querySelector('#logout-btn');

logouBtn.addEventListener('click', async e => {
  try {
    await axios.get('/api/logout');
    window.location.pathname = '/';
  } catch (error) {
    console.log(error);
  }
});
