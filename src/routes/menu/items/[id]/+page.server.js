import { error } from "@sveltejs/kit"
import { loadFlashMessage } from "sveltekit-flash-message/server"
import { GATEWAY_URL } from "$env/static/private"

/** @type {import("./$types").PageLoad} */
export const load = loadFlashMessage( async ({ fetch, params }) => {
    // fetch editing obj
    let response = await fetch(`${GATEWAY_URL}/items/${params.id}`)

    let body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    const item = body.data

    // fetch tags
    const url = `${GATEWAY_URL}/tags`
    const options = {
        method: "GET"
    }

    response = await fetch(url, options)

    body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

     const tags = body.data

    return {
        item,
        tags
    } 
})