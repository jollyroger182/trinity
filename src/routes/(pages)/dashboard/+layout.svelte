<script>
	import { navigating } from '$app/state'

	const { children } = $props()
</script>

{#if navigating.to}
	Loading...
{:else}
	{@render children()}
{/if}
