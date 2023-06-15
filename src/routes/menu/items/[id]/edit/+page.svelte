<script>
    import { page } from "$app/stores"

    let backUrl = $page.url.toString().split("/").slice(0, - 1).join("/")

    /** @type {import("./$types").PageData} */
    export let data

    let selectedCategory = data.categories.find(c => c.subcategories.some(s => s.id === data.item.subcategory.id))

    let subcategories = selectedCategory.subcategories

    let selectedSubcategoryId = data.item.subcategory.id

    function handleCategoryChange() {
        subcategories = selectedCategory.subcategories ||  []
    }
</script>

<form method="POST">
    <div class="container mt-4">

        <h1>
            Edit menu item <b>{data.item.name}</b>
        </h1>
        <hr>
        <div class="mb-4">
            <label class="form-label" for="name">Name</label>
            <br>
            <input class="form-control" id="name" type="text" name="name" placeholder="Pizza, Hamburger..." value={data.item.name} required />
        </div>
            
        <div class="mb-4">
            <label class="form-label" for="quantity">Quantity</label>
            <br>
            <input class="form-control" id="quantity" type="text" name="quantity" placeholder="Plate for 1, 250g steak..." value={data.item.quantity} required />
        </div>
        
        <div class="mb-4">
            <label class="form-label" for="description">Description</label>
            <br>
            <textarea class="form-control" id="description" type="text" name="description" placeholder="Brief description..." value={data.item.description} required />
        </div>

        <div class="mb-4">
            <label class="form-label" for="price">Price (€)</label>
            <br>
            <input class="form-control" id="price" type="number" name="price" min="0.01" value={data.item.price} step=".01" required />
        </div>

        <div class="mb-4">
            <label class="form-label" for="category">Category</label>
            <select class="form-select" id="category" bind:value={selectedCategory} on:change={handleCategoryChange} required>
                <option value={null} hidden selected>Select a category</option>
                {#each data.categories as category}
                    <option value={category}>
                        {category.name}
                    </option>
                {/each}
            </select>
        </div>

        <div class="mb-4">
            <label class="form-label" for="subcategory">Subcategory</label>
            <select bind:value={selectedSubcategoryId} class="form-select" id="subcategory" name="subcategoryId" required>
                 {#each subcategories as subcategory}
                    <option value={subcategory.id}>
                        {subcategory.name}
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