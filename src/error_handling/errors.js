export default class ErrorModel {
    constructor(code, message, data) {
        this.message = message;
        this.data = data?.data;
        this.code = code;
        this.error = data?.error;
    }

    static resolveError(error, req, res) {
        if (error instanceof ErrorModel) {
            return res.status(error.code).json({
                message: error.message,
                data: error.data,
            });
        } else {
            return res.status(500).send(error.toString());
        }
    }
}

const NonExistentUserError = new ErrorModel(404, 'Usuário não existe');
const IncorrectPasswordError = new ErrorModel(401, 'Usuário ou senha incorretos');
const EmailAlreadyRegisteredError = new ErrorModel(400, 'Email já cadastrado');
const InvalidTokenError = new ErrorModel(401, 'Token inválido');
const MissingTokenError = new ErrorModel(401, 'Token não informado');
const ForbiddenError = new ErrorModel(403, 'Acesso negado');

export {
    EmailAlreadyRegisteredError,
    NonExistentUserError,
    IncorrectPasswordError,
    InvalidTokenError,
    MissingTokenError,
    ForbiddenError,
    ErrorModel
};