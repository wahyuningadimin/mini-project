const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const getEvents = async () => {
    const res = await fetch(`${base_url}/events`, { cache: 'no-cache' })
    const result = await res.json()

    return { result, events: result.events, ok: res.ok }
}
