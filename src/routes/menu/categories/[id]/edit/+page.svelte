<script>
    /** @type {import("./$types").PageData} */
    import { page } from "$app/stores"
    
    /** @type {import("./$types").ActionData} */
    export let form

    /** @type {import("./$types").PageData} */
    export let data

    let backUrl = $page.url.toString().split("/").slice(0, - 1).join("/")
</script>

{#if !!form}
    {#if !form.success}
        <h1 style="color: crimson">
            {form.message}
        </h1>
    {:else}
        <h1 style="color: chartreuse">
            {form.message}
        </h1>
    {/if}
    
{/if}

<form method="POST">
    <div class="container mt-4">
        <h1>
            Edit category <b>{data.data.name}</b>
        </h1>
        <hr>
        <div class="mb-4">
            <label class="form-label" for="name">Name</label>
            <br>
            <input class="form-control" id="name" type="text" name="name" placeholder="Food, Drinks..." value={data.data.name} required />
        </div>

        <a href="{backUrl}">
            <button type="button" class="btn btn-secondary">Go back</button>
        </a>
        <input class="btn btn-primary" type="submit" />
    </div>
</form>