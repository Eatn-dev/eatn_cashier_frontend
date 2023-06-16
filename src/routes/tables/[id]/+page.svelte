<script>
    import moment  from "moment"
    import { page } from "$app/stores"

    /** @type {import("./$types").PageData} */
    export let data
</script>

<div class="container mt-4">
    <h1>Table {data.data.id}</h1>
    <br>
    <p>Number of chairs: {data.data.chairAmt}</p>
    <p>Created at: {moment(data.data.createdAt).format("DD.MM.YYYY. HH:mm")}</p>
    <p>Last updated at: {moment(data.data.updatedAt).format("DD.MM.YYYY. HH:mm")}</p>
    <hr>

    <a href="{$page.url}/edit">
        <button type="button" class="btn btn-warning">Edit</button>
    </a>
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteTableModal">
        Delete
    </button>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteTableModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteTableModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteTableModalLabel">Delete table</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete <b>Table {data.data.id}</b>?
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