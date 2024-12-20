import axios from "axios";

const API_URL = process.env.DIRECTUS_API_URL;
const API_TOKEN = process.env.DIRECTUS_API_TOKEN;

const directus = axios.create({
	baseURL: "https://buskanini-cms.onrender.com",
});

export async function fetchGraphQL(query, variables = {}) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/graphql`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});
	const data = await res.json();
	return data;
}
