import { User } from "@/types/events"
const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const regUser = async (data: User) => {
    const res = await fetch(`${base_url}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const result = await res.json()
    return { result, ok: res.ok }
}


export const loginUser = async (data: User) => {
    const res = await fetch(`${base_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const result = await res.json()
    return { result, ok: res.ok }
}

export const verifyUser = async (token: string) => {
    const res = await fetch(`${base_url}/auth/verify`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const result = await res.json()
    return { result, ok: res.ok }
}