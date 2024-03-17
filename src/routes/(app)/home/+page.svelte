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
		{#if data.hosted.length === 0}
			<div class="card card-compact w-96 bg-base-100 shadow-xl h-96">
				<div class="card-body btn btn-ghost text-xl">You do not currently have any projects.</div>
			</div>
		{/if}
		{#each data.watching.slice(0, 4) as watchingProject}
			<div class="card card-compact w-96 bg-base-100 shadow-xl h-96">
				<figure class="h-64">
					{#if watchingProject.image === ''}
						<img
							src='https://as2.ftcdn.net/v2/jpg/04/83/35/33/1000_F_483353394_baks2bsYpfB8muZTnZJpXSUd2OtP2Gdn.jpg'
							alt="Sustainable clothing logo"
							class="w-full object-cover"
						/>
					{:else}
						<img src={watchingProject.image} alt="Sustainable clothing logo" class="w-full object-cover" />
					{/if}
				</figure>
				<div class="card-body">
					<h2 class="card-title">{watchingProject.title}</h2>
					<p>{watchingProject.description.length > 100 ? `${watchingProject.description.substring(0, 150)}...` : watchingProject.description}</p>
					<div class="card-actions justify-end">
						<a href={`/project-${watchingProject.id}`} class="btn btn-primary">View</a>
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
		<a href="\display" class="btn btn-outline btn-success w-full lg:h-96 lg:w-fit max-w-96">View all</a>
	</div>
	<a href="/all" class="btn btn-outline btn-success">Browse all projects</a>
</div>
