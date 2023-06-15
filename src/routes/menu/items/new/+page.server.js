import { error } from "@sveltejs/kit"
import { GATEWAY_URL } from "$env/static/private"
import { redirect } from "sveltekit-flash-message/server"

/** @type {import("./$types").PageLoad} */
export const load = async ({ fetch }) => {
    const url = `${GATEWAY_URL}/categories`
    const options = {
        method: "GET"
    }

    const response = await fetch(url, options)

    const body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    return body
}

/** @type {import("./$types").Actions} */
export const actions = {
    default: async (event) => {

        const formData = await event.request.formData();

        let data = Object.fromEntries(formData)

        // cast price to numeric because form sends it as string
        data.price = parseFloat(data.price)

        // cast subcategoryId to int because form sends it as string
        data.subcategoryId = parseInt(data.subcategoryId)

        const url = `${GATEWAY_URL}/items`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        
        const response = await event.fetch(url, options)

        if (!response.ok) {
            console.log(await response.json())
            return { success: false, message: "Something went wrong."}
        }

        throw redirect(
            301,
            "/menu/items", 
            {
                type: "success",
                message: "Menu item added successfully"
            },
            event
        )
    }
}