export interface IqQuery {
    [key: string]: string | number | boolean | Array<string | number | boolean> | null
}
export interface ISearchQuery {
    page?: number,
    limit?: number,
    [key: string]: IqQuery | string | number | boolean | Array<string | number | boolean> | null
}
export interface IPostParams {
    [key: string]: IqQuery | string | number | boolean | Array<string | number | boolean | any> | null
}
