import axios, {AxiosResponse} from 'axios';
import Config from '../config/config'

export const getAllBooks = (): Promise<AxiosResponse> => {
    return axios.get(`${Config.SERVICE_URL}/api/book/list`);
}
