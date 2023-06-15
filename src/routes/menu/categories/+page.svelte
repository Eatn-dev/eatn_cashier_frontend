<script>
    import { page } from "$app/stores";

    /** @type {import("./$types").PageData} */
    export let data;
</script>

<a href="{$page.url}/new">
    <input type="button" value="Create new category" />
</a>
<br />

<div class="container">
    <div class="row row-cols-2 align-items-center justify-content-start">
        {#each data.data as category}
            <div class="col g-3">
                <div class="card">
                    <a href="categories/{category.id}" class="text-decoration-none">
                        <div class="card-body text-center">
                            <h4 class="card-title">
                                {category.name}
                            </h4>
                            <div class="text-muted">
                                {category.subcategories.length} subcategor{category.subcategories.length == 1 ? "y" : "ies"}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>
