export interface Review {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    _id: string;
    review: string;
    course_id: string;
    student_id: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
