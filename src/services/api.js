import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39017406-8a2bd96a6988b9cda18c74697';


export const fetchImg = async (page, perPage, searchImg) => {
const { data } = await axios.get(`${BASE_URL}?q=${searchImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`);

return data;
}