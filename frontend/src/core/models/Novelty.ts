import { IUser } from "./User";

export enum NoveltyStatus {
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}

export interface INovelty {
    _id: string;
    title: string;
    description: string;
    date: Date;
    content: string;
    author: Partial<IUser>;
    archiveDate?: Date;
    status: NoveltyStatus;
}