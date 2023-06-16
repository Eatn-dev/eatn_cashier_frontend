<script>
    import { page } from "$app/stores";

    /** @type {import("./$types").PageData} */
    export let data;
</script>

<a href="{$page.url}/new">
    <input type="button" value="Create new table" />
</a>
<br />

<div class="container">
    <div class="row row-cols-2 align-items-center justify-content-start">
        {#each data.data as table}
            <div class="col g-3">
                <div class="card">
                    <a href="tables/{table.id}" class="text-decoration-none">
                        <div class="card-body text-center">
                            <h4 class="card-title">
                                Table {table.id}
                            </h4>
                            <div class="text-muted">
                                {table.chairAmt} chair{table.chairAmt == 1 ? "" : "s"}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>
