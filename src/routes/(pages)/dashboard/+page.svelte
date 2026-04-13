<script lang="ts">
	import { createProject } from '$lib/client/api'
	import { slide } from 'svelte/transition'

	let { data } = $props()

	let projects = $state(data.projects!)

	let creating = $state(false)
	let createState = $state({ name: '', description: '', hackatimeProjects: [] })

	async function submitCreate() {
		const project = await createProject(createState)
		projects.push(project)
		console.log(projects)
		creating = false
	}
</script>

<h1>Welcome, <span class="gradient-text">{data.name}!</span></h1>

<h2 style="display: flex; align-items: center; flex-wrap: wrap">
	<span style="flex: 1 0 0">Your projects</span>
	{#if creating}
		<div class="form-card" in:slide={{ duration: 200 }}>
			<input placeholder="Name" bind:value={createState.name} />
			<textarea placeholder="Description" bind:value={createState.description}></textarea>
			<select multiple bind:value={createState.hackatimeProjects}>
				<option value="example">example</option>
				<option value="placeholder">placeholder</option>
			</select>
			<div style="">
				<button class="btn-hover-slide" onclick={submitCreate}><span>Submit</span></button>
				<button class="btn-hover-slide" onclick={() => (creating = false)}
					><span>Cancel</span></button
				>
			</div>
		</div>
	{:else}
		<button class="btn-skewed btn-hover-slide" onclick={() => (creating = true)}
			><span>➕ Create</span></button
		>
	{/if}
</h2>

{#each projects as project (project.id)}
	<div style="border: 3px solid var(--color-fg); padding: 0 1em; margin-bottom: 1em">
		<h3 style="margin-bottom: 0; font-size: 1.3em">{project.name}</h3>

		<p style="font-size: calc(var(--font-size) * 0.8)">
			Hackatime: {project.hackatimeProjects.join(', ') || 'none selected'}
		</p>
		<p>{project.description}</p>
	</div>
{/each}

<style>
	.form-card {
		border: 2px solid #1a1a1a;
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
