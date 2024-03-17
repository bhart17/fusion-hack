<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Active Projects</title>
	<meta name="description" content="Active Projects" />
</svelte:head>

<div class="flex flex-col p-4 gap-6">
	<div class="flex gap-4 items-center">
		<h1 class="text-3xl font-bold">All Projects</h1>
	</div>

	<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
		{#each data.projects ?? [] as hostedProject}
			<div class="card card-compact bg-base-100 shadow-xl">
				<figure class="h-64">
					{#if hostedProject.project.image === ''}
						<img
							src="https://as2.ftcdn.net/v2/jpg/04/83/35/33/1000_F_483353394_baks2bsYpfB8muZTnZJpXSUd2OtP2Gdn.jpg"
							alt="Sustainable clothing logo"
							class="w-full object-cover"
						/>
					{:else}
						<img
							src={hostedProject.project.image}
							alt="Sustainable clothing logo"
							class="w-full object-cover"
						/>
					{/if}
				</figure>
				<div class="card-body">
					<h2 class="card-title">{hostedProject.project.title}</h2>
					<p>{hostedProject.project.description}</p>
					<div class="card-actions justify-end">
						<a href={`/project-${hostedProject.id}`} class="btn btn-primary">View</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
