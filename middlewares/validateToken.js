const AuthClient = require('../clients/keycloakClient');

const validateToken = async (req, res = response, next) => {
   
    if (req.headers.authorization) {
        const { status, data } = await AuthClient.validateToken(req.headers.authorization);
        if (status === 401) {
            const resp = await AuthClient.refreshToken(req.headers.refreshtoken);
            if(resp) {
                console.log(resp.status);
                if(resp.status == 400) {
                    return res.status(401).json({
                        error: `unauthorized`,
                        data: 'No valids tokens avaiable'
                    });
                }
                return res.status(401).json({
                    data: {
                        access_token: resp.data.access_token,
                        refresh_token: resp.data.refresh_token
                    }
                });
            } else {
               res.status(401).json({
                   error: `unauthorized`,
                   data: 'No valids token avaiable'
               });
               return;
           }
        } else if( status === 200 ){
            req.username = data.preferred_username;
        }
        next();
    } else {
        // there is no token, don't process request further
        res.status(401).json({
            error: `unauthorized`,
            data: 'No token in headers'
        });
    }
}

module.exports = {
    validateToken
}