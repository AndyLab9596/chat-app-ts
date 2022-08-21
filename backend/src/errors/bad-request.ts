import { StatusCodes } from "http-status-codes";
import CustomeAPIError from "./custom-api-error";

class BadRequestError extends CustomeAPIError {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError;