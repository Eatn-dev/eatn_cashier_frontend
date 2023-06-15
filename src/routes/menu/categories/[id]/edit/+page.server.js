import { error } from "@sveltejs/kit"
import { GATEWAY_URL } from "$env/static/private"
import { redirect, loadFlashMessage } from "sveltekit-flash-message/server"

/** @type {import("./$types").PageLoad} */
export const load = loadFlashMessage( async ({ fetch, params }) => {
    const url = `${GATEWAY_URL}/categories/${params.id}`

    const response = await fetch(url)

    const body = await response.json()

    if(!response.ok){
        throw error(response.status)
    }

    return body 
})

/** @type {import("./$types").Actions} */
export const actions = {
    default: async (event) => {

        const formData = await event.request.formData();

        let data = Object.fromEntries(formData)

        const url = `${GATEWAY_URL}/categories/${event.params.id}`
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
            `/menu/categories/${event.params.id}`, 
            {
                type: "success",
                message: "Category edited successfully"
            },
            event
        )
    }
}