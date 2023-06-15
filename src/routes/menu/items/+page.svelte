<script>
    import { page } from "$app/stores"
	import Pill from '$lib/Pill.svelte'
    
    /** @type {import("./$types").PageData} */
    export let data
</script>

<a href="{$page.url}/new">
    <input type="button" value="Create new menu item"/>
</a>
<br>
<ul class="list-group">
    {#each data.data as item}
    <li class="list-group-item px-4">
        <a href="{$page.url}/{item.id}" class="text-decoration-none">
            <h1>{item.name}</h1>
        </a>
        <!-- <hr> -->
        <div style="padding-bottom: 10px">
            {#each item.tags as tag}
            <a href="/menu/tags/{tag.id}" class="text-decoration-none">
                <Pill tag={tag}/>
            </a>
            {/each}
        </div>
        {#if item.subcategory}
            <p>Category: {item.subcategory.category.name}</p>
            <p>Subcategory: {item.subcategory.name}</p>
        {/if}
        <p>Quantity: {item.quantity}</p>
        <p>Price: {item.price}€</p>
    </li>
    {/each}
</ul>