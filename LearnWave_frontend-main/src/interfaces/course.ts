export interface Message {
    success: boolean;
    message: string;
    data?: (Course)[] | null;
    error?: (Course)[] | null;
}
export interface Course {
    _id: string;
    title: string;
    image: string,
    description: string;
    category: string;
    instructor?: (string)[] | null;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (SectionEntity | null)[] | null;
    enrollment?: (string | null)[] | null;
    tag: string;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface SectionEntity {
    _id: string;
    set_course_id: string;
    title: string;
    subSection?: (string)[] | null;
    isDisabled: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface EnrolledCourse {
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
    course_id: CourseId;
    progress: number;
    total: number;
    isCompleted: boolean;
    _id: string;
    progress_bar: number;
}
export interface CourseId {
    progress: number;
    _id: string;
    image?: string | null;
    title: string;
    description: string;
    category: string;
    instructor: string;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (string | null)[] | null;
    enrollment?: (string)[] | null;
    tag: string;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IState {
    loading: boolean,
    data: EnrolledCoursesEntity[],
    errorMsg: string
}
export interface subsection {
    success: boolean;
    message: string;
    data: subSectionData;
    error?: null;
}
export interface subSectionData {
    videoCompleted: boolean;
}


export interface getOneCourse {
    success: boolean;
    message: string;
    data: CData;
    error?: null;
}
export interface CData {
    progress: number;
    _id: string;
    image: string;
    title: string;
    description: string;
    category: string;
    instructor: string;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (string)[] | null;
    enrollment?: (string)[] | null;
    tag: string;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface getInstructorCourse {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    progress: number;
    _id: string;
    title: string;
    description: string;
    category: string;
    instructor: string;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (string | null)[] | null;
    enrollment?: (string | null)[] | null;
    tag: string;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image?: string | null;
}

export interface CourseUpdate {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface Data {
    _id: string;
    image: string;
    title: string;
    description: string;
    category: string;
    instructor: string;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (null)[] | null;
    enrollment?: (null)[] | null;
    tag: string;
    progress: number;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface GetOneCourse {
    success: boolean;
    message: string;
    data: CData;
    error?: null;
}
export interface CData {
    _id: string;
    image: string;
    title: string;
    description: string;
    category: string;
    instructor: string;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (string)[] | null;
    enrollment?: (null)[] | null;
    tag: string;
    progress: number;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface AllCourse {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    progress: number;
    _id: string;
    title: string;
    description: string;
    category: string;
    instructor: string;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (string | null)[] | null;
    enrollment?: (string | null)[] | null;
    tag: string;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image?: string | null;
}





