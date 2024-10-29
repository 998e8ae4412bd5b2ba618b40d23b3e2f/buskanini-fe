import axios from 'axios';

const API_URL = process.env.DIRECTUS_API_URL; // Set in your .env file
const API_TOKEN = process.env.DIRECTUS_API_TOKEN; // Set in your .env file

const directus = axios.create({
    baseURL: 'https://buskanini-cms.onrender.com'
});

export const fetchData = async (collection) => {
    try {
        const response = await directus.get(`/items/${collection}`);
        return response.data.data; // Returns array of items from Directus
    } catch (error) {
        console.error("Error fetching data from Directus:", error);
        return null;
    }
};
