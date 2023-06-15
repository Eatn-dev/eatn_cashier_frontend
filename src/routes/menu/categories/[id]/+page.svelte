<script>
    import moment  from "moment"
    import { page } from "$app/stores"
    

    const fetchSubcategory = async (id) => {
        const response = await fetch(`${page}?id=${id}`, {
            method: "OPTIONS",
        })
        return response.ok ? await response.json() : {}
    }

    export const fillSubcategoryItems = async (event) => {
        if (event.target.getAttribute("aria-expanded") === "true") {
            const response = await fetchSubcategory(event.target.id)
            let menuItems = response.data.menu_items

            document.querySelector(`#dropdown-${event.target.id}`).className = "dropup"

            if (menuItems.length){
                menuItems.forEach(item => {
                    let el = document.createElement("a")
                    el.setAttribute("href", `/menu/items/${item.id}`)
                    el.setAttribute("class", "list-group-item list-group-item-dark list-group-item-action")
                    el.innerHTML = item.name
    
                    document.querySelector(`#items-${event.target.id}`).appendChild(el)
                })
            }
            else {
                let el = document.createElement("button")
                el.setAttribute("class", "list-group-item list-group-item-danger")
                el.innerHTML = "Oops! no subcategories here"

                document.querySelector(`#items-${event.target.id}`).appendChild(el)
            }
        }
        else {
            document.querySelector(`#dropdown-${event.target.id}`).className = "dropdown"
            document.querySelector(`#items-${event.target.id}`).innerHTML = ""
        }
    }
    
    /** @type {import("./$types").PageData} */
    export let data
</script>

<div class="container mt-4">
    <h1>{data.data.name}</h1>
    <br>
    <p>Created at: {moment(data.data.createdAt).format("DD.MM.YYYY. HH:mm")}</p>
    <p>Last updated at: {moment(data.data.updatedAt).format("DD.MM.YYYY. HH:mm")}</p>
    <hr>

    <a href="{$page.url}/edit">
        <button type="button" class="btn btn-warning">Edit</button>
    </a>
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCategoryModal">
        Delete
    </button>

    <div class="mt-5">
        <h3>
            Subcategories assigned to <b>{data.data.name}</b>
        </h3>
        <div class="container row">
            {#if !data.data.subcategories.length}
                <div class="text-center mt-5">
                    <h3>
                        Oops! No subcategories here
                    </h3>
                </div>
            {/if}
            <div class="btn-group list-group">
                {#each data.data.subcategories as subcategory}
                    <div id="dropdown-{subcategory.id}" class="dropdown">
                        <button on:click={async (event) => { await fillSubcategoryItems(event) }} id="{subcategory.id}" class="dropdown-toggle list-group-item list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#items-{subcategory.id}" aria-expanded="false" aria-controls="{subcategory.id}-items">
                            {subcategory.name}
                        </button>
                        <div class="list-group list-group-flush" id="items-{subcategory.id}">
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteCategoryModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteCategoryModalLabel">Delete category</h5>
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