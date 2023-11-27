export interface EmailVerify {
    success: boolean;
    message: string;
    data: DataOrError;
    error: DataOrError;
}
export interface DataOrError {
    userId: string;
}


export interface studentInfo {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface Data {
    result: Result;
    Access_token: string;
    Refresh_Token: string;
}
export interface Result {
    _id: string;
    fname: string;
    lname: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: number;
    role: number;
    verified: boolean;
    isDeleted: boolean;
    reviews?: (null)[] | null;
    order?: (null)[] | null;
    failedLoginAttempt: number;
    resetPassword: boolean;
    resetPasswordToken?: null;
    resetPasswordExpire?: null;
    enrolled_courses?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
