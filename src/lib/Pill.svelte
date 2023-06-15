<script>
    export let tag
    export let element = "span"
    export let isBadge = true
    let fgColor = "#000000"
    let bgColor = "#ffffff"
</script>

<svelte:element this={element} class="{isBadge ? "badge" : ""} rounded-pill pill" style:color={tag?.fgColor || fgColor} style:background-color={tag?.bgColor || bgColor} {...$$restProps} >
    <!-- <slot></slot> -->
    {#if tag}
        {tag.name}
    {:else}
        <slot></slot>
    {/if}
</svelte:element>

<style>
    .pill {
        /* color: var(--fgColor, #000000); */
        /* background-color: var(--bgColor, #ffffff); */
        border: 1px solid #000000;
        padding: .25em var(--padding-y, 1em);
    }
</style>