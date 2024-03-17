<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home" />
</svelte:head>

<div class="flex flex-col p-4 gap-6">
	<h1 class="text-3xl font-bold">Currently Watching</h1>

	<div class="flex flex-col lg:flex-row items-center gap-2 w-full">
		{#if data.watching.length === 0}
			<div class="card card-compact w-96 bg-base-100 shadow-xl" style="height: 300px;">
				<div class="card-body btn btn-ghost text-xl">
					You are not currently watching any projects.
				</div>
			</div>
		{/if}
		{#each data.watching as watchedProject}
			<div class="card card-compact w-96 bg-base-100 shadow-xl h-96">
				<figure class="h-64">
					{#if watchedProject.image === ''}
						<img
							src='https://as2.ftcdn.net/v2/jpg/04/83/35/33/1000_F_483353394_baks2bsYpfB8muZTnZJpXSUd2OtP2Gdn.jpg'
							alt="Sustainable clothing logo"
							class="w-full object-cover"
						/>
					{:else}
						<img src={watchedProject.image} alt="Sustainable clothing logo" class="w-full object-cover" />
					{/if}
				</figure>
				<div class="card-body">
					<h2 class="card-title">{watchedProject.title}</h2>
					<p>{watchedProject.description}</p>
					<div class="card-actions justify-end">
						<a href={`/project-${watchedProject.id}`} class="btn btn-primary">View</a>
					</div>
				</div>
			</div>
			<!-- <div class="divider divider-horizontal"></div> -->
		{/each}
	</div>

	<div class="flex gap-4 items-center">
		<h1 class="text-3xl font-bold">Your Projects</h1>
		<button
			class="btn btn-outline"
			on:click={() => {
				goto('/newProject');
			}}>Create Project</button
		>
	</div>

	<div class="flex flex-col lg:flex-row items-center gap-2 w-full">
		{#if data.hosted.length === 0}
			<div class="card card-compact w-96 bg-base-100 shadow-xl h-96">
				<div class="card-body btn btn-ghost text-xl">You do not currently have any projects.</div>
			</div>
		{/if}
		{#each data.hosted.slice(0, 4) as hostedProject}
			<div class="card card-compact w-96 bg-base-100 shadow-xl h-96">
				<figure class="h-64">
					{#if hostedProject.image === ''}
						<img
							src='https://as2.ftcdn.net/v2/jpg/04/83/35/33/1000_F_483353394_baks2bsYpfB8muZTnZJpXSUd2OtP2Gdn.jpg'
							alt="Sustainable clothing logo"
							class="w-full object-cover"
						/>
					{:else}
						<img src={hostedProject.image} alt="Sustainable clothing logo" class="w-full object-cover" />
					{/if}
				</figure>
				<div class="card-body">
					<h2 class="card-title">{hostedProject.title}</h2>
					<p>{hostedProject.description}</p>
					<div class="card-actions justify-end">
						<a href={`/project-${hostedProject.id}`} class="btn btn-primary">View</a>
					</div>
				</div>
			</div>
			<!-- <div class="divider divider-horizontal"></div> -->
		{/each}
		<a href="/display" class="btn btn-outline btn-success h-96">View all</a>
	</div>
	<a href="/all" class="btn btn-outline btn-success">Browse all projects</a>
</div>
