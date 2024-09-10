const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const getEvents = async (_p0: { search: string }) => {
    const res = await fetch(`${base_url}/events`, { cache: 'no-cache' })
    const result = await res.json()

    return { result, events: result.events, ok: res.ok }
}

export const getEventbyId = async (id: string) => {
    const res = await fetch(`${base_url}/events/${id}`, { cache: 'no-cache' })
    const result = await res.json()

    return { result, event: result.event, ok: res.ok }
}

export const getEventTiers = async (id: string) => {
    const res = await fetch(`${base_url}/events/getEventTiers/${id}`, { cache: 'no-cache' })
    const result = await res.json()

    return { result, tiers: result.tiers, ok: res.ok }
}
// export const getEvent = async (search: string) => {
//     const res = await fetch(`${base_url}/events${search}`, { cache: 'no-cache' })
//     const result = await res.json()

//     return { result, events: result.events, ok: res.ok }
// }