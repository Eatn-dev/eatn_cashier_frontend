<script>
    /** @type {import("./$types").PageData} */
    import { page } from "$app/stores"

    /** @type {import("./$types").PageData} */
    export let data

    let backUrl = $page.url.toString().split("/").slice(0, - 1).join("/")
</script>

<form method="POST">
    <div class="container mt-4">
        <h1>
            Create new tag
        </h1>
        <hr>
        <div class="mb-4">
            <label class="form-label" for="name">Name</label>
            <br>
            <input class="form-control" id="name" type="text" name="name" placeholder="Vegan, Gluten-free..." value="{data.data.name}" required />
        </div>

        <div class="mb-4">
            <label class="form-label" for="icon">Icon link</label>
            <br>
            <input class="form-control" id="icon" type="text" name="icon" placeholder="https://icons8.com/icon/1349/website" value="{data.data.icon}" required />
        </div>

        <div class="mb-4 d-flex flex-row">
            <div class="mx-3">
                <label for="fgColor">Foreground color</label>
                <br>
                <input type="color" name="fgColor" value="{data.data.fgColor}" required>
            </div>
            <div class="mx-3">
                <label for="bgColor">Background color</label>
                <br>
                <input type="color" name="bgColor" value="{data.data.bgColor}" required>
            </div>
        </div>

        <a href="{backUrl}">
            <button type="button" class="btn btn-secondary">Go back</button>
        </a>
        <input class="btn btn-primary" type="submit" />
    </div>
</form>