const login = async (req, res) => {
  const { email, password } = req.body;

  const token = email + password;
  
  return res.status(201).json(token);
};

module.exports = {
  login,
};
