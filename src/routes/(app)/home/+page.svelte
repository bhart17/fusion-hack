<script lang="ts">
	import { signIn, signOut } from '$lib/firebase/login';
	import { user } from '$lib/firebase/client/auth';
	export let data: {
		watching: {
			title: string;
			description: string;
			image: string;
		}[];
		hosted: {
			title: string;
			description: string;
			image: string;
		}[];
	};
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">FabricFusion</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				current user: {$user?.email}
				<button
					class="btn"
					on:click={() => {
						signIn('user@test.com', 'password');
					}}>Login</button
				>
				<button class="btn" on:click={signOut}>Logout</button>
			</li>
		</ul>
	</div>
</div>

<br />
<br />
<h1 class="text-3xl font-bold">Currently Watching</h1>
<br />
<br />
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

	<!-- <div class="card card-compact w-96 bg-base-100 shadow-xl">
		<figure>
			<img
				src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg"
				alt="Sustainable clothing logo"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">Project: Insert project title</h2>
			<p>Project description</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">View</button>
			</div>
		</div>
	</div>
	<div class="divider divider-horizontal"></div>
	<div class="card card-compact w-96 bg-base-100 shadow-xl">
		<figure>
			<img
				src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg"
				alt="Sustainable clothing logo"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">Project: Insert project title</h2>
			<p>Project description</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">View</button>
			</div>
		</div>
	</div>
	<div class="divider divider-horizontal"></div>
	<div class="card card-compact w-96 bg-base-100 shadow-xl">
		<figure>
			<img
				src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg"
				alt="Sustainable clothing logo"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">Project: Insert project title</h2>
			<p>Project description</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">View</button>
			</div>
		</div>
	</div>
	<div class="divider divider-horizontal"></div>
	<div class="card card-compact w-96 bg-base-100 shadow-xl">
		<figure>
			<img
				src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg"
				alt="Sustainable clothing logo"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">Project: Insert project title</h2>
			<p>Project description</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">View</button>
			</div>
		</div>
	</div> -->
</div>
<br />
<br />
<h1 class="text-3xl font-bold">Your projects</h1>
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
			<figure>
				{#if hostedProject.image === ''}
					<img
						src={'https://media.istockphoto.com/id/1283569480/vector/recycling-environment-label-with-on-white-background.jpg?s=612x612&w=0&k=20&c=8LhkYEW6wrXjPHLJ7xxu1-DdospS-0jhAo-YeRrlNk4='}
						alt="Sustainable clothing logo"
					/>
				{/if}
				<img src={hostedProject.image} alt="Sustainable clothing logo" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">{hostedProject.title}</h2>
				<p>{hostedProject.description}</p>
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
