import jwt from 'jsonwebtoken';
import Envs from '../config/envs.js';

// TODO: adicionar criptografia
export default class Auth {
    static createAccessToken(user, userAccess=['default'], expiresIn='30m') {
        return jwt.sign({
            id: user.id,
            data: user,
            access: userAccess,
        }, Envs.accessTokenSecret, { expiresIn });
    }

    static createRefreshToken(user, userAccess=['default']) {
        return jwt.sign({
            id: user.id,
            data: user,
            access: userAccess,
        }, Envs.refreshTokenSecret);
    }
}