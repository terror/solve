import axios from 'axios';

const api = axios.create({ baseURL: '/api/' });

const judge = axios.create({
    baseURL: 'https://' + process.env.REACT_APP_RAPIDAPI_HOST,
    headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
    },
});

export { api, judge };
