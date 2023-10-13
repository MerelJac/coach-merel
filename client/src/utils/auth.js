// export const auth = async () => {
//   const token = await JSON.parse(localStorage.getItem("token"));
//   if (!token) {
//   return false;
//   } else {return true}
//   };

// module.exports = auth;

//   const jwt = require('jsonwebtoken');

// const secret = 'mysecretssshhhhhhh';
// const expiration = '2h';

// module.exports = {
//   authMiddleware: function ({ req }) {
//     // allows token to be sent via req.body, req.query, or headers
//     let token = req.body.token || req.query.token || req.headers.authorization;

//     // We split the token string into an array and return actual token
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return req;
//     }

//     // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//     }

//     // return the request object so it can be passed to the resolver as `context`
//     return req;
//   },
//   signToken: function ({ email, name, _id }) {
//     const payload = { email, name, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };

const decode = require ("jwt-decode");

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

const authInstance = new AuthService();
export default authInstance

