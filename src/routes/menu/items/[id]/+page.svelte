<script>
	import Pill from '$lib/Pill.svelte'
    import TagDropdown from "$lib/TagDropdown.svelte"

    import moment from "moment"
    import { page } from "$app/stores"
    import { getFlash } from 'sveltekit-flash-message/client'
    
    /** @type {import("./$types").PageData} */
    export let data

    const flash = getFlash(page)

    let item = data.item
    let itemTags = item.tags

    let tags = data.tags
</script>

<div class="container mt-4">
    <h1>{item.name}</h1>
    <div class="pb-2">
        <div class="pill-menu-wrapper" type="button" id="tagMenuDropdown" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
            <Pill element="button" --padding-y="0.375em">+</Pill>
        </div>
        {#each itemTags as tag}
            <a href="/menu/tags/{tag.id}" class="me-1 text-decoration-none">
                 <Pill tag={tag}/>
            </a>
        {/each}
        <br>
        <TagDropdown item={item} bind:itemTags={itemTags} tags={tags} flash={flash} />
    </div>

    {#if item.subcategory}
        <p>Category: <a href="/menu/categories/{item.subcategory.category.id}" class="text-decoration-none">{item.subcategory.category.name}</a></p>
        <p>Subcategory: <a href="/menu/subcategories/{item.subcategory.id}" class="text-decoration-none">{item.subcategory.name}</a></p>
    {/if}

    <p>Description: {item.description}</p>
    <p>Quantity: {item.quantity}</p>
    <p>Price: {item.price}€</p>
    <br>
    <p>Created at: {moment(item.createdAt).format("DD.MM.YYYY. HH:mm")}</p>
    <p>Last updated at: {moment(item.updatedAt).format("DD.MM.YYYY. HH:mm")}</p>
    <hr>
    
    <a href="{$page.url}/edit">
        <button type="button" class="btn btn-warning">Edit</button>
    </a>
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
        Delete
    </button>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteItemModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteItemModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteItemModalLabel">Delete item</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete <b>{item.name}</b>?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <a href="{$page.url}/delete">
                <button type="button" data-bs-dismiss="modal" class="btn btn-danger">Delete</button>
            </a>
        </div>
      </div>
    </div>
  </div>

  <style>
    .pill-menu-wrapper {
        display: inline;
    }
  </style>