interface ICreateRouteDTO {
    driver_id: string;
    enterprise_id: string;
    id?: string;
    initialDate: Date;
    expectedEnd?:Date;
    isFinished?:boolean;
}
export { ICreateRouteDTO }