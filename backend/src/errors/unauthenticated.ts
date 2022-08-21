import { StatusCodes } from 'http-status-codes';
import CustomeAPIError from './custom-api-error';

class UnauthenticatedError extends CustomeAPIError {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnauthenticatedError;