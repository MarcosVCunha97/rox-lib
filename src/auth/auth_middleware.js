
import {
    ErrorModel, EmailAlreadyRegisteredError,
    InvalidTokenError,
    MissingTokenError,
} from "../error_handling/errors.js";

import Envs from "../config/envs.js";

// TODO: adicionar tipo de usuário e criptografia
export default class AuthMiddleware {

    static authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) throw new MissingTokenError();

        jwt.verify(token, Envs.accessTokenSecret, (err, user) => {
            if (err) throw new InvalidTokenError();
            req.user = user;
            // Se certifica de que tanto _id como id existem
            if (req.user._id != null) req.user.id = req.user._id;
            else if (req.user.id != null) req.user._id = req.user.id;
            next()
        })
    }

    static authenticateRefreshToken(req, res, next) {

        if ('OPTIONS' === req.method) return next();
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) throw MissingTokenError;

        jwt.verify(token, Envs.refreshTokenSecret, (err, user) => {
            if (err) throw InvalidTokenError;
            req.refreshToken = token;
            req.user = user;
            // Se certifica de que tanto _id como id existem
            if (req.user._id != null) req.user.id = req.user._id;
            else if (req.user.id != null) req.user._id = req.user.id;
            delete req.user.iat;
            next()
        })
    }

    /**
     * This code is used to get the auth data from the auth header
     * and set it on the request object.
     * 
     * Should be used as express middleware.
     * 
     * If the auth header is not present, then the auth data is not set.
     * 
     * The auth data is set on the req.authData property.
     * 
     * @param {Object} req The HTTP request object
     * @param {Object} res The HTTP response object
     * @param {Function} next The next function in the middleware chain
     */
    static getDataFromAuthHeaderMiddleware(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const data = AuthUtils.getDataFromAuthHeader(authHeader);
            if (data) {
                req.authData = data;
            }
        }
        next();
    }
}