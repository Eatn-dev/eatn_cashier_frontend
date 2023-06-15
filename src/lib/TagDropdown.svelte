<script>
    import Pill from "./Pill.svelte"
    import { page } from "$app/stores"
    export let item
    export let itemTags
    export let tags
    export let flash

    const handleClick = async (event) => {
        const tagId = parseInt(event.target.id.split("-")[1])
        const response = await fetch(`${page}?tagId=${tagId}&itemId=${item.id}`, {
            method: "OPTIONS"
        })

        const body = await response.json()
        if (response.ok) {

            if (body.message.split(" ")[1] === "assigned") {
                // add tag to itemTags
                const addingTag = tags.find(t => t.id == tagId)
                itemTags = [ ...itemTags, addingTag ]
            }
            else {
                // remove tag from itemtags
                itemTags = itemTags.filter(t => t.id !== tagId)
            }

            event.target.checked = !event.target.checked

            if (flash)
                $flash = { type: 'success', message: body.message }
        }
        else {
            if (flash)
                $flash = { type: 'fail', message: body.message }
        }
    }
</script>

<div class="dropdown-menu" aria-labelledby="tagMenuDropdown">
    <div class="list-group">
        {#each tags as tag}
            <div class="list-group-item">
                {#if itemTags.some(t => t.id === tag.id)}
                    <input type="checkbox" class="form-check-input" id="tag-{tag.id}" on:click={async (event) => {await handleClick(event)}} checked onclick="return false;">
                {:else}
                    <input type="checkbox" class="form-check-input" id="tag-{tag.id}" on:click={async (event) => {await handleClick(event)}} onclick="return false;">
                {/if}
                    <Pill tag={tag}/>
            </div>
        {/each}
    </div>
</div>