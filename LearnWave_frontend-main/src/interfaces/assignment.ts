export interface AllAssignment {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    _id: string;
    set_course_id: string;
    set_section_id: string;
    title: string;
    question: string;
    isDisbled: boolean;
    __v: number;
}

export interface getAssignmentById {
    success: boolean;
    message: string;
    data: AData;
    error?: null;
}
export interface AData {
    _id: string;
    set_course_id: SetCourseId;
    set_section_id: SetSectionId;
    title: string;
    question: string;
    isDisbled: boolean;
    __v: number;
}
export interface SetCourseId {
    _id: string;
    image: string;
    title: string;
    description: string;
    category: string;
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
    progress: number;
    subscription: boolean;
    instructor: string;
}
export interface SetSectionId {
    _id: string;
    set_course_id: string;
    title: string;
    subSection?: (string)[] | null;
    isDisabled: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface uploadAssignment {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface Data {
    set_course_id: string;
    student_id: string;
    assignment_id: string;
    assignmentURL: string;
    checked: boolean;
    _id: string;
    __v: number;
}

