<script lang="ts">
	import { goto } from '$app/navigation'
	import { resolve } from '$app/paths'
	import { createProject, getHackatimeProjects } from '$lib/client/api'
	import { formatTime } from '$lib/utils/formatting'
	import { slide } from 'svelte/transition'

	let { data } = $props()

	// svelte-ignore state_referenced_locally
	let projects = $state(data.projects!)
	let creating = $state(false)
	let createState = $state({ name: '', description: '', hackatimeProjects: [] })

	let usedHackatimeProjects = $derived(new Set(projects.flatMap((p) => p.hackatimeProjects)))

	async function submitCreate() {
		const project = await createProject(createState)
		projects.push(project)
		console.log(projects)
		creating = false
		createState.name = ''
		createState.description = ''
		createState.hackatimeProjects = []
	}
</script>

<nav>
	<a href={resolve('/')} data-sveltekit-preload-data="off">← Home</a>
</nav>

<h1>Welcome, <span class="gradient-text">{data.name}!</span></h1>

<h2 style="display: flex; align-items: center; flex-wrap: wrap">
	<span style="flex: 1 0 0">Your projects</span>
	{#if data.isHackatimeLinked}
		<button class="btn-skewed btn-hover-slide" onclick={() => (creating = !creating)}
			><span>➕ Create</span></button
		>
	{:else}
		<button
			class="btn-skewed btn-hover-slide"
			onclick={() => goto(resolve('/auth/hackatime/redirect'))}
			><span>🔗 Link Hackatime</span></button
		>
	{/if}
</h2>

{#if creating}
	<div class="form-card" style="margin-bottom: 1em" transition:slide={{ duration: 200 }}>
		<input placeholder="Name" bind:value={createState.name} />
		<textarea placeholder="Description" bind:value={createState.description}></textarea>
		{#await getHackatimeProjects()}
			<span>Loading Hackatime projects...</span>
		{:then hackatimeProjects}
			<div>
				<select multiple bind:value={createState.hackatimeProjects}>
					{#each hackatimeProjects as project (project.name)}
						<option value={project.name} disabled={usedHackatimeProjects.has(project.name)}
							>{project.name} ({formatTime(project.total_seconds)})</option
						>
					{/each}
				</select>
				<div style="color: var(--color-muted); font-size: 0.8em">
					Ctrl/Cmd+Click to select multiple
				</div>
			</div>
		{:catch}
			<span>Failed to load Hackatime projects. Please reload the page.</span>
		{/await}
		<div>
			<button class="btn-hover-slide" onclick={submitCreate}><span>Submit</span></button>
			<button class="btn-hover-slide" onclick={() => (creating = false)}><span>Cancel</span></button
			>
		</div>
	</div>
{/if}

{#each projects as project (project.id)}
	<div style="border: 3px solid var(--color-fg); padding: 0 1em; margin-bottom: 1em">
		<h3 style="margin-bottom: 0; font-size: 1.3em">{project.name}</h3>

		<p style="font-size: 0.8em; margin: 0.5em 0;">
			Hackatime: {project.hackatimeProjects.join(', ') || 'none selected'}
		</p>

		<p style="margin-top: 0">{project.description}</p>
	</div>
{/each}

{#if projects.length === 0}
	You don't have any projects. Click the button to create one!
{/if}

<style>
	.form-card {
		border: 2px solid #1a1a1a;
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
