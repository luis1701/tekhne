const axios = require('axios').default;

class keycloakClient {
  constructor() {
    this.client_id = 'myclient';
    this.client_secret = 'J2vZ3UOXpfGPk9qmVAbvWckRtIRQWnM3'
    this.instance = axios.create({
      baseURL: 'http://localHost:8080',
      timeout: 3000,
    });
  }
  getInstance() {
    return this.instance;
  }
  login(user, password) {
    // TODO call login to keycloak
  }
}

module.exports = new keycloakClient();