import { StatusCodes } from "http-status-codes";
import CustomeAPIError from "./custom-api-error";

class NotFoundError extends CustomeAPIError {
    status: number;
    constructor(message: string) {
        super(message)
        this.status = StatusCodes.NOT_FOUND
    }
}
export default NotFoundError