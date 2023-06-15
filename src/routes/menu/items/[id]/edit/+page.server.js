import { error } from "@sveltejs/kit"
import { redirect } from "sveltekit-flash-message/server"
import { GATEWAY_URL } from "$env/static/private"

/** @type {import("./$types").PageLoad} */
export async function load({ fetch, params }){
    // fetch editing obj
    let response = await fetch(`${GATEWAY_URL}/items/${params.id}`)

    let body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    const item = body.data

    // fetch categories and subcategories
    const url = `${GATEWAY_URL}/categories`
    const options = {
        method: "GET"
    }

    response = await fetch(url, options)

    body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

     const categories = body.data

    return {
        item,
        categories
    } 
}

export const actions = {
    default: async(event) => {
        const formData = await event.request.formData();

        // check if menu item exists before doing anything

        let response = await fetch(`${GATEWAY_URL}/items/${event.params.id}`)

        if(!response.ok){
            throw error(response.status)
        }
        
        let data = Object.fromEntries(formData)

        // cast price to numeric because form sends it as string
        data.price = parseFloat(data.price)

        // cast subcategoryId to int because form sends it as string
        data.subcategoryId = parseInt(data.subcategoryId)

        response = await event.fetch(`${GATEWAY_URL}/items/${event.params.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            return { success: false, message: "Something went wrong."}
        }

        throw redirect(
            301,
            `/menu/items/${event.params.id}`,
            {
                type: "success",
                message: "Menu item edited successfully"
            },
            event
        )
    }
}
