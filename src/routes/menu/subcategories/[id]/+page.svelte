<script>
    import moment  from "moment"
    import { page } from "$app/stores"

    /** @type {import("./$types").PageData} */
    export let data
</script>

<div class="container mt-4">
    <h1>{data.data.name}</h1>
    <br>
    <p>Category: <a href="/menu/categories/{data.data.category.id}" class="text-decoration-none">{data.data.category.name}</a></p>
    <p>Created at: {moment(data.data.createdAt).format("DD.MM.YYYY. HH:mm")}</p>
    <p>Last updated at: {moment(data.data.updatedAt).format("DD.MM.YYYY. HH:mm")}</p>
    <hr>

    <a href="{$page.url}/edit">
        <button type="button" class="btn btn-warning">Edit</button>
    </a>
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteSubCategoryModal">
        Delete
    </button>

    <div class="mt-5">
        <h3>
            Menu items assigned to <b>{data.data.name}</b>
        </h3>
        <div class="container row">
            {#if !data.data.menu_items.length}
                <div class="text-center mt-5">
                    <h3>
                        Oops! No menu items here
                    </h3>
                </div>
            {/if}
            <div class="list-group">
                {#each data.data.menu_items as item}
                    <a class="list-group-item list-group-item-action" href="/menu/items/{item.id}">{item.name}</a>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteSubCategoryModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteSubCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteSubCategoryModalLabel">Delete subcategory</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete <b>{data.data.name}</b>?
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