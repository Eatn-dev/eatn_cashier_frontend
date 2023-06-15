<script>
    import { page } from "$app/stores";

    /** @type {import("./$types").PageData} */
    export let data;
</script>

<a href="{$page.url}/new">
    <input type="button" value="Create new subcategory" />
</a>
<br />

<div class="container">
    <div class="row row-cols-2 align-items-center justify-content-start">
        {#each data.data as subcategory}
            <div class="col g-3">
                <div class="card">
                    <a href="subcategories/{subcategory.id}" class="text-decoration-none">
                        <div class="card-body text-center">
                            <h4 class="card-title">
                                {subcategory.name}
                            </h4>
                            <p class="card-text text-dark">
                                Category: {subcategory.category.name}
                            </p>
                            <p class="card-text">
                                <small class="text-muted">
                                    {subcategory.menu_items.length} menu item{subcategory.menu_items.length == 1 ? "" : "s"}
                                </small>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>
