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
