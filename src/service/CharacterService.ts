import axios from '../interceptor/axiosInstance';
import { AxiosResponse } from 'axios';

//Api calls for getting characters
const getCharacters= (pageIndex:number) => {
    //Condition for api character 
    let uri = pageIndex === 0 ? `api/character` :   `api/character?page=${pageIndex}`;
    return axios<AxiosResponse>({
        method: 'GET',
        url:uri
    });
};
const CharacterService = {getCharacters };
export default CharacterService;
