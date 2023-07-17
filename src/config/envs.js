
export default class Envs {

    static get accessTokenSecret() {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (secret == null) throw new Error('ACCESS_TOKEN_SECRET not set');
        return secret;
    }

    static get refreshTokenSecret() {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        if (secret == null) throw new Error('REFRESH_TOKEN_SECRET not set');
        return secret;
    }

}