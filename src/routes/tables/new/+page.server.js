import { GATEWAY_URL } from "$env/static/private"
import { redirect } from "sveltekit-flash-message/server"

/** @type {import("./$types").Actions} */
export const actions = {
    default: async (event) => {

        const formData = await event.request.formData();

        let data = Object.fromEntries(formData)

        const url = `${GATEWAY_URL}/tables`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        
        const response = await event.fetch(url, options)

        if (!response.ok) {
            return { success: false, message: "Something went wrong."}
        }

        throw redirect(
            301,
            "/tables", 
            {
                type: "success",
                message: "Table added successfully"
            },
            event
        )
    }
}