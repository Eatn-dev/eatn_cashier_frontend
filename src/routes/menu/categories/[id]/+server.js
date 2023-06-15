import { json } from "@sveltejs/kit"
import { GATEWAY_URL } from "$env/static/private"

export const OPTIONS = async ({ url }) => {
    const subcategoryId = url.searchParams.get("id")
    
    const apiUrl = `${GATEWAY_URL}/subcategories/${subcategoryId}`
    
    const response = await fetch(apiUrl)
    
    const body = await response.json()
    
    return json(
        body
    )
}