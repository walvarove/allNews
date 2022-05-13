import { IUser } from '../users/model';
import { Document } from "mongoose";


export enum NoveltyStatus {
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}

export interface INovelty extends Document {
    title: string;
    description: string;
    date: Date;
    content: string;
    author: IUser;
    archiveDate?: Date;
    status: NoveltyStatus;
}

