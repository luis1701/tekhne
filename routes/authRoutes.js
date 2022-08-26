const router = require('express').Router();
const AuthClient = require('../clients/keycloakClient');
const { validateToken } = require('../middlewares/validateToken');

router.post('/login', async (req, res, next) => {
  const { body } = req;
  const {user, password} = body;
  const loginResponse = await AuthClient.login(user, password)
  return res.status(200).json(loginResponse);
});

router.post('/validate', validateToken , async (req, res, next) => { 
 
    if(req.username) {
       return res.status(200).json({
        ok: true,
        username: req.username
    });

    }

   
});

module.exports = router;