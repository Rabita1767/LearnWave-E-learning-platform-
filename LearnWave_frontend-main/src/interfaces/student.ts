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

export interface StudentCount {
    success: boolean;
    message: string;
    data: StudentData;
    error?: null;
}
export interface StudentData {
    total: number;
}
export interface CourseCount {
    success: boolean;
    message: string;
    data: CourseData;
    error?: null;
}
export interface CourseData {
    total: number;
}

export interface AllStudent {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
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
    reviews?: (null)[] | null;
    order?: (null)[] | null;
    failedLoginAttempt: number;
    resetPassword: boolean;
    resetPasswordToken?: null;
    resetPasswordExpire?: null;
    enrolled_courses?: (EnrolledCoursesEntity | null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    cart_id?: string | null;
    isDeleted: boolean;
}
export interface EnrolledCoursesEntity {
    course_id: string;
    progress: number;
    total?: number | null;
    isCompleted: boolean;
    _id: string;
    progress_bar: number;
}


