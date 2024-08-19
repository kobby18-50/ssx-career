import CustomAPI from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

class UnAuthorizedError extends CustomAPI{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnAuthorizedError