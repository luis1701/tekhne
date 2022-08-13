const router = require('express').Router();
const AuthClient = require('../clients/keycloakClient')

router.post('/login', async (req, res, next) => {
  const { body } = req;
  const {user, password} = body;
  const loginResponse = await AuthClient.login(user, password)
  return res.status(200).json(loginResponse);
});

module.exports = router;