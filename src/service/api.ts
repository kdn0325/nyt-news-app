import axios from "axios";

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const axiosInstance = axios.create({baseURL:BASE_URL});


