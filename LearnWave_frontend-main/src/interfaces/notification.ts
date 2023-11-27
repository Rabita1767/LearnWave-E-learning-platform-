export interface Notification {
    success: boolean;
    message: string;
    data?: (DataEntity)[] | null;
    error?: null;
}
export interface DataEntity {
    _id: string;
    sender: string;
    receiver?: (string)[] | null;
    cartID: string;
    message: string;
    forAdmin: boolean;
    notificationType: string;
    read: boolean;
    isAccepted: boolean;
    createdAt: string;
    __v: number;
}
export interface IState {
    loading: boolean,
    data: DataEntity[],
    errorMsg: String
}