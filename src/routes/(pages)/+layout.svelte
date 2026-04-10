<script lang="ts">
	let { children } = $props()
</script>

<!-- <nav class="navbar"></nav> -->

{@render children()}

<style>
	.navbar {
		background-color: #ddd;
	}
</style>
