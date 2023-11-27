"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, status, message, result = null) => {
    const response = {
        success: status < 400,
        message: message,
        data: result,
        error: result
    };
    if (status >= 400) {
        response.success = false;
        response.error = result;
        response.message = "Internal server error";
    }
    else {
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
exports.default = sendResponse;
//# sourceMappingURL=common.js.map