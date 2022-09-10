const logOut = (req, res) => {
  res.clearCookie('token').json({ message: 'logout' });
};

module.exports = logOut;
