
export default class AuthUtils {

    /**
     * 
     * This function takes the authorization header and returns the encoded username and password
     * 
     * You can use AuthMiddleware.getDataFromAuthHeaderMiddleware as a middleware to set the auth data on the request object
     * instead of calling this function directly.
     * 
     * @param {string} authHeader - The authorization header
     * @returns {string or list<string>} - The encoded data (may be a string or a list of strings)
     * 
     */
    static getDataFromAuthHeader(authHeader) {
        const base64 = authHeader.split(' ')[1];
        const auth = Buffer.from(base64, 'base64').toString('ascii');
        if(auth.contains(':')){
            return auth.split(':');
        }else{
            return auth;
        }
    }
}