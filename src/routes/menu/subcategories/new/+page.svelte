<script>
    /** @type {import("./$types").PageData} */
    import { page } from "$app/stores"

    /** @type {import("./$types").PageData} */
    export let data

    let selectedCategoryId

    let backUrl = $page.url.toString().split("/").slice(0, - 1).join("/")
</script>

<form method="POST">
    <div class="container mt-4">
        <h1>
            Create new subcategory
        </h1>
        <hr>
        <div class="mb-4">
            <label class="form-label" for="name">Name</label>
            <br>
            <input class="form-control" id="name" type="text" name="name" placeholder="Hot drinks, cold drinks..." required />
        </div>
        
        <div class="mb-4">
            <label class="form-label" for="category">Category</label>
            <select class="form-select" id="category" name="categoryId" bind:value={selectedCategoryId} required>
                <option value="" hidden selected>Select a category</option>
                {#each data.data as category}
                    <option value={category.id}>
                        {category.name}
                    </option>
                {/each}
            </select>
        </div>

        <a href="{backUrl}">
            <button type="button" class="btn btn-secondary">Go back</button>
        </a>
        <input class="btn btn-primary" type="submit" />
    </div>
</form>