export interface Section {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    _id: string;
    set_course_id: string;
    title: string;
    subSection?: (string)[] | null;
    isDisabled: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
