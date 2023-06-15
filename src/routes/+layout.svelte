<script>
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import { beforeNavigate } from '$app/navigation';
    import { initFlash } from "sveltekit-flash-message/client"
    
    const flash = initFlash(page)
    const flashTimeoutMs= 1500

    beforeNavigate((nav) => {
        if ($flash && nav.from?.url.toString() != nav.to?.url.toString()) {
            $flash = undefined;
        }
    })

    let flashTimeout
    $: if ($flash) {
        clearTimeout(flashTimeout);
        flashTimeout = setTimeout(() => ($flash = undefined), flashTimeoutMs);
    }
</script>

{#if $flash}
    {@const style = $flash.type === "success" ? "success" : "danger"}
    <div transition:fade class="alert alert-{style} m-2" id="alert" role="alert">
        <b>{$flash.message}</b>
    </div>
{/if}

<slot/>

<style>
    #alert {
        position: fixed;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 9999;
    }
</style>
