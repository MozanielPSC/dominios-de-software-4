interface ICreatePathDTO {
    route_id: string;
    initLat: number;
    finalLat: number;
    initLong: number;
    finalLong: number;
    id?: string;
    isInitial: boolean;
    isFinal: boolean;
}
export { ICreatePathDTO }