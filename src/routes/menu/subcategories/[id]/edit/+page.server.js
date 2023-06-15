import { error } from "@sveltejs/kit"
import { GATEWAY_URL } from "$env/static/private"
import { redirect } from "sveltekit-flash-message/server"

/** @type {import("./$types").PageLoad} */
export const load = async ({ fetch, params }) => {
    let url = `${GATEWAY_URL}/categories`
    let options = {
        method: "GET"
    }

    let response = await fetch(url, options)

    let body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    const categories = body.data

    url = `${GATEWAY_URL}/subcategories/${params.id}`
    options = {
        method: "GET"
    }

    response = await fetch(url, options)

    body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    const subcategory = body.data

    return {
        subcategory,
        categories
    }
}

/** @type {import("./$types").Actions} */
export const actions = {
    default: async (event) => {

        const formData = await event.request.formData();

        let data = Object.fromEntries(formData)

        // cast categoryId to int because form sends it as string
        data.categoryId = parseInt(data.categoryId)

        const url = `${GATEWAY_URL}/subcategories/${event.params.id}`
        const options = {
            method: "PUT",
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
            "/menu/subcategories", 
            {
                type: "success",
                message: "Subcategory edited successfully"
            },
            event
        )
    }
}
