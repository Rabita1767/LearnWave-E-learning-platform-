export interface AllVideo {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface Data {
    _id: string;
    fname: string;
    lname: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    verified: boolean;
    phoneNumber: number;
    role: number;
    failedLoginAttempt: number;
    resetPassword: boolean;
    resetPasswordToken?: null;
    resetPasswordExpire?: null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Instructor {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface IData {
    _id: string;
    fname: string;
    lname: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    verified: boolean;
    phoneNumber: number;
    role: number;
    failedLoginAttempt: number;
    resetPassword: boolean;
    resetPasswordToken?: null;
    resetPasswordExpire?: null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

