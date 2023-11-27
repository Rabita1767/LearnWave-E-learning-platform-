export interface ICart {
    course: ICourse[]
}
export interface ICourse {
    course_id: string
}
export interface ComponentState {
    addQ: boolean;
    addOp: boolean;
}