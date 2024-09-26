import fetchWrapper from "./fetch-wrapper"

const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const getActivePoints = async () => {
    const res = await fetchWrapper(`${base_url}/points/getActivePoints`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json()

    return { result, points: result.activePoints, ok: res.ok }
}

export const getUserDiscount = async () => {
    const res = await fetchWrapper(`${base_url}/users/getUserDiscount`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json()

    return { result, discountActive: result.discountActive, ok: res.ok }
}

export const getUserEvents = async () => {
    const res = await fetchWrapper(`${base_url}/users/getUserEvents`, { cache: 'no-cache', method: 'GET' })
    const result = await res.json()

    return { result, events: result.categorizedEvent, ok: res.ok }
}