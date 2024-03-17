<script lang="ts">
	import { signIn, signOut } from '$lib/firebase/login';
	import { user, userData } from '$lib/firebase/client/auth';
	export let data
</script>


<h1 class="text-3xl font-bold py-10">Currently Watching</h1>

<div class="flex w-full">
	{#if data.watching.length === 0}
		<div class="card card-compact w-96 bg-base-100 shadow-xl" style="height: 300px;">
			<div class="card-body btn btn-ghost text-xl">
				You are not currently watching any projects.
			</div>
		</div>
	{/if}
	{#each data.watching as watchedProject}
		<div class="card card-compact w-96 bg-base-100 shadow-xl">
			<figure>
				<img src={watchedProject.image} alt="Sustainable clothing logo" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">{watchedProject.title}</h2>
				<p>{watchedProject.description}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">View</button>
				</div>
			</div>
		</div>
		<div class="divider divider-horizontal"></div>
	{/each}
</div>
<br />
<br />
<div class="nameContainer">
	<h1 class="text-3xl font-bold">Your projects</h1>
	<button class="btn btn-outline">Create Project</button>
</div>
<br />
<br />
<div class="flex w-full">
	{#if data.hosted.length === 0}
		<div class="card card-compact w-96 bg-base-100 shadow-xl" style="height: 300px;">
			<div class="card-body btn btn-ghost text-xl">You do not currently have any projects.</div>
		</div>
	{/if}
	{#each data.hosted.slice(0, 4) as hostedProject}
		<div class="card card-compact w-96 bg-base-100 shadow-xl">
			<figure class="h-64">
				{#if hostedProject.image === ''}
					<img
						src={'https://as2.ftcdn.net/v2/jpg/04/83/35/33/1000_F_483353394_baks2bsYpfB8muZTnZJpXSUd2OtP2Gdn.jpg'}
						alt="Sustainable clothing logo"
					/>
				{/if}
				<img src={hostedProject.image} 
				     alt="Sustainable clothing logo" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">{hostedProject.title}</h2>
				<p>{hostedProject.description}</p>
				<div class="card-actions justify-end">
					<a href={`/project-${hostedProject.id}`} class="btn btn-primary">View</a>
				</div>
			</div>
		</div>
		<div class="divider divider-horizontal"></div>
	{/each}
</div>
<br />
<br />
