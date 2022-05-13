import { INovelty } from '../models/Novelty';
import { ApiService } from './../services/api.service';

const NOVELTIES_ENDPOINTS = {
    ALL: '/novelties',
    MINE:'/novelties/mine'
}

export class NoveltiesApi {
    static getAllNovelties(): Promise<INovelty[]> {
        return ApiService.get<INovelty[]>(NOVELTIES_ENDPOINTS.ALL);
    }

    static getMyNovelties(): Promise<INovelty[]> {
        return ApiService.get<INovelty[]>(NOVELTIES_ENDPOINTS.MINE);
    }

    static update(id: string, novelty: Partial<INovelty>): Promise<INovelty> {
        return ApiService.put<INovelty>(NOVELTIES_ENDPOINTS.ALL + '/' + id, novelty);
    }
    static delete(id: string) {
        return ApiService.delete(NOVELTIES_ENDPOINTS.ALL + '/' + id);
    }
}