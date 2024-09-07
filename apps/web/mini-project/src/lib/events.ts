const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const getEvents = async (id: number) => {
    const res = await fetch(`${base_url}/events`, { cache: 'no-cache' })
    const result = await res.json()

    return { result, events: result.events, ok: res.ok }
}


// export const getEvent = async (search: string) => {
//     const res = await fetch(`${base_url}/events${search}`, { cache: 'no-cache' })
//     const result = await res.json()

//     return { result, events: result.events, ok: res.ok }
// }