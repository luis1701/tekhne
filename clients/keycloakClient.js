const axios = require('axios').default;
const qs = require('qs');

class keycloakClient {
  constructor() {
    this.client_id = 'myclient';
    this.client_secret = 'hJFwr6UyJDYF7h5n5YAzIBAz0MQIpqFo'
    this.instance = axios.create({
      baseURL: 'http://localHost:8080',
      timeout: 3000,
    });
  }
  getInstance() {
    return this.instance;
  }
  async login(user, password) {
      try {
        const data = { 
            'grant_type': 'password',
            'client_id': this.client_id,
            'client_secret': this.client_secret,
            'username': user,
            'password': password
         };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:8080/realms/myRealm/protocol/openid-connect/token',
        };

        const res = await axios(options);

        return res.data
    } catch (error) {
        return error
    }
  }
  async validateToken(token) {
    try {
      const options = {
        method: 'GET',
        url: `http://localhost:8080/realms/myRealm/protocol/openid-connect/userinfo`,
        headers: {
            // add the token you received to the userinfo request, sent to keycloak
            Authorization: `Bearer ${token}`,
        }
      };

      const response = await axios(options);
      
      return response;

    } catch (error) {
        return error.response;
    }
  }

  async refreshToken(refreshToken) {
    try {
      const data = { 
          'grant_type': 'refresh_token',
          'client_id': this.client_id,
          'client_secret': this.client_secret,
          refresh_token: refreshToken
       };
      const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: 'http://localhost:8080/realms/myRealm/protocol/openid-connect/token',
      };

      const res = await axios(options);

      return res;
    } catch (error) {
        return error.response
    }
  }
}

module.exports = new keycloakClient();