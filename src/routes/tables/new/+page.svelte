<script>
    /** @type {import("./$types").PageData} */
    import { page } from "$app/stores"

    let backUrl = $page.url.toString().split("/").slice(0, - 1).join("/")
</script>

<form method="POST">
    <div class="container mt-4">
        <h1>
            Create new table
        </h1>
        <hr>
        <div class="mb-4">
            <label class="form-label" for="chairAmt">Number of chairs</label>
            <br>
            <input class="form-control" id="chairAmt" type="number" name="chairAmt" placeholder="4" min="1" step="1" onchange="this.value = parseInt(this.value);" required />
        </div>

        <a href="{backUrl}">
            <button type="button" class="btn btn-secondary">Go back</button>
        </a>
        <input class="btn btn-primary" type="submit" />
    </div>
</form>