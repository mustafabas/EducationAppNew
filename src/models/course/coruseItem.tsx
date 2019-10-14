
export interface IHomeModel{
    imagepath : string;
    courses :ICourseItem[];
}
export interface ICourseItem{
    id: number;
    name: string;
    displayPrice :string;
    content:string;
}