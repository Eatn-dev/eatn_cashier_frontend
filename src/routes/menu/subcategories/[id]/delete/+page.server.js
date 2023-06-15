import { error } from "@sveltejs/kit"
import { redirect } from "sveltekit-flash-message/server"
import { GATEWAY_URL } from "$env/static/private"

/** @type {import("./$types").PageLoad} */
export async function load(event){
        const response = await event.fetch(`${GATEWAY_URL}/subcategories/${event.params.id}`,
    {
        method: "DELETE"
    })

    if(!response.ok){
        throw error(response.status)
    }

    throw redirect(
        301,
        "/menu/subcategories",
        {
            type: "success",
            message: "Subcategory deleted successfully"
        },
        event
    )
}