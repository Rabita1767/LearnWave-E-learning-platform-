export interface AddCart {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}


export interface viewCart {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}

export interface Data {
    _id: string;
    student_id: string;
    course?: (CourseEntity)[] | null;
    isDisbled: boolean;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface CourseEntity {
    course_id: CourseId;
    isAccepted: boolean;
    _id: string;
}
export interface CourseId {
    _id: string;
    image?: string | null;
    title: string;
    description: string;
    category: string;
    instructor?: (string)[] | null;
    isApproved: boolean;
    isDisabled: boolean;
    section?: (string | null)[] | null;
    enrollment?: (null)[] | null;
    tag: string;
    rating: number;
    reviews?: (null)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

