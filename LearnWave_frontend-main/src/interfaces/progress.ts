export interface Progress {
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
    enrolled_courses?: (EnrolledCoursesEntity)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    cart_id: string;
}
export interface EnrolledCoursesEntity {
    course_id: string;
    progress: number;
    total: number;
    isCompleted: boolean;
    _id: string;
}
export interface ProgressCount {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface Data {
    ContentLength: number;
}


export interface Enrolled_Course {
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
    enrolled_courses?: (EnrolledCoursesEntity)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    cart_id: string;
}
export interface EnrolledCoursesEntity {
    course_id: string;
    progress: number;
    total: number;
    isCompleted: boolean;
    _id: string;
    progress_bar: number;
}


