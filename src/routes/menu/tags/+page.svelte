<script>
	import Pill from '$lib/Pill.svelte'
    
    import { page } from "$app/stores"
    /** @type {import("./$types").PageData} */
    export let data;
</script>

<a href="{$page.url}/new">
    <input type="button" value="Create new tag" />
</a>
<br />

<div class="container">
    <div class="row row-cols-2 align-items-center justify-content-start">
        {#each data.data as tag}
            <div class="col g-3">
                <div class="card text-center">
                    <a href="tags/{tag.id}" class="text-decoration-none">
                        <div class="card-body">
                            <div id="title-wrapper">
                                <div class="card-title">
                                    <Pill element="h4" isBadge={false} tag={tag}/>
                                </div>
                            </div>
                            <div class="text-muted">
                                {tag.menu_items.length} menu item{tag.menu_items.length == 1 ? "" : "s"}
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    #title-wrapper {
        display: flex;
        justify-content: center;
    }
</style>