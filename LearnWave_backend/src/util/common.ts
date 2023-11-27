import { Response } from "express";
interface apiResponse {
    success: boolean,
    data: any,
    message?: string,
    error?: any,
}
const sendResponse = (res: Response, status: number, message: string, result: any = null): void => {
    const response: apiResponse = {
        success: status < 400,
        message: message,
        data: result,
        error: null
    };
    if (status >= 400) {
        response.success = false;
        response.error = result;
        response.message = "Internal server error";
    } else {
        response.success = true;
        response.data = result;
        response.message = "Successfully completed operations";
    }

    if (message) {
        response.message = message;
    }
    res.status(status).send(response);
};

// module.exports = { sendResponse };
export default sendResponse;