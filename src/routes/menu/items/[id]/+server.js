import { error } from "@sveltejs/kit"
import { GATEWAY_URL } from "$env/static/private"

export const OPTIONS = async ({ url }) => {
    const tagId = parseInt(url.searchParams.get("tagId"))
    const itemId = parseInt(url.searchParams.get("itemId"))

    let apiUrl = `${GATEWAY_URL}/items/${itemId}`

    let response = await fetch(apiUrl)

    let body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    const item = body.data
    const tags = item.tags

    let tagInteractionResponse
    if (tags.some(tag => tag.id === tagId)) {
        tagInteractionResponse = await fetch(`${apiUrl}/tags/${tagId}`, {
            method: "DELETE"
        })
    }
    else {
        tagInteractionResponse = await fetch(`${apiUrl}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tagId: tagId
            })
        })
    }
    

    if (tagInteractionResponse.ok) {
        const body = await tagInteractionResponse.json()
        return new Response(JSON.stringify({message: body.data.message}))
    }
    else
        return new Response(JSON.stringify({ message: "Something went wrong." }), { status: 400})
}