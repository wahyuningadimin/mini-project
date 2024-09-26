const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"
import fetchWrapper from '@/lib/fetch-wrapper'
import { headers } from 'next/headers'
import { getToken } from './server'

export const getEvents = async () => {
    const res = await fetchWrapper(`${base_url}/events`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json()

    return { result, events: result.events, ok: res.ok }
}

export const getEventbyId = async (id: string) => {
    const res = await fetchWrapper(`${base_url}/events/${id}`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json()

    return { result, event: result.event, ok: res.ok }
}

export const getEventBySlug = async (slug: string) => {
    const res = await fetchWrapper(`${base_url}/events/getEventBySlug/${slug}`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json()

    return { result, events: result.event || [], ok: res.ok };
}

export const getEventsPaginated = async (query: string, page: any, size: any, category: string, location: string) => {
    const res = await fetchWrapper(`${base_url}/events/paginated?query=${query}&page=${page}&size=${size}&category=${category}&location=${location}`, { method: 'GET' });
    const result = await res.json();

    return { result };
}

export const getEventTiers = async (id: string) => {
    const res = await fetchWrapper(`${base_url}/events/getEventTiers/${id}`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json()

    return { result, tiers: result.tiers, ok: res.ok }
}

export const getMasterLocations = async (category: string) => {
    const res = await fetchWrapper(`${base_url}/events/locations?category=${category}`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json();

    return { result };
}

export const createEvent = async (formData: FormData) => {
    const token = getToken();

    const headers: HeadersInit = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${base_url}/events/createEvent`, {
        cache: 'no-cache',
        method: "POST",
        body: formData,
        headers: headers
    })
    const result = await res.json();
    return { result };
}

export const submitReview = async (review: any) => {

    const res = await fetchWrapper(`${base_url}/review`, {
        cache: 'no-cache',
        method: "POST",
        body: JSON.stringify(review)
    })
    const result = await res.json();
    return { result };
}


// export const getEvent = async (search: string) => {
//     const res = await fetch(`${base_url}/events${search}`, { cache: 'no-cache' })
//     const result = await res.json()

//     return { result, events: result.events, ok: res.ok }
// }