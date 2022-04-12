interface ICreatePathDTO {
    route_id: string;
    initLat: number;
    initLong: number;
    city_name:string;
    state:string;
    finalLat?: number;
    finalLong?: number;
    id?: string;
    isInitial?: boolean;
    isFinal?: boolean;
    isComplete?: boolean;
}
export { ICreatePathDTO }