export interface Section {
    success: boolean;
    message: string;
    data?: (DataEntitySub)[] | null;
    error?: null;
}
export interface DataEntitySub {
    _id: string;
    set_section_id: string;
    video_title?: string | null;
    video?: string | null,
    videoUrl?: string | null;
    resource?: string | null,
    assignment?: string | null,
    isDisabled: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    quiz?: string | null;
}

export interface Video {
    success: boolean;
    message: string;
    data: Data;
    error?: null;
}
export interface Data {
    _id: string;
    set_section_id: string;
    video_title: string;
    videoUrl: string;
    isDisabled: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AllSubSection {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    _id: string;
    set_course_id: string;
    set_section_id: string;
    video_title?: string | null;
    videoUrl?: string | null;
    isDisabled: boolean;
    videoCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    quiz?: Quiz | null;
    assignment?: Assignment | null;
}
export interface Quiz {
    _id: string;
    set_course_id: string;
    set_section_id: string;
    title: string;
    isDeleted: boolean,
    questions?: (QuestionsEntity)[] | null;
    __v: number;
}
export interface QuestionsEntity {
    question: string;
    options?: (OptionsEntity)[] | null;
    answer: string;
    _id: string;
}
export interface OptionsEntity {
    value: string;
    _id: string;
}
export interface Assignment {
    _id: string;
    set_course_id: string;
    set_section_id: string;
    title: string;
    question: string;
    __v: number;
}


export interface AllVideo {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    _id: string;
    set_course_id: string;
    set_section_id: string;
    video_title: string;
    videoUrl: string;
    isDisabled: boolean;
    videoCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


