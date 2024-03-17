<script lang="ts">
	export let data;

	import { user, userData } from '$lib/firebase/client/auth';
	import { firestore } from '$lib/firebase/client/firestore';
	import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

	$: watching = $userData?.watching.includes(data.id);
	
	let items = data.project?.items;


	async function watchProject() {
		await updateDoc(doc(firestore.users, $user?.uid), { watching: arrayUnion(data.id) });
	}

	async function unwatchProject() {
		await updateDoc(doc(firestore.users, $user?.uid), { watching: arrayRemove(data.id) });
	}
</script>
<svelte:head>
	<title>Project Details</title>
	<meta name="description" content="Project Details" />
</svelte:head>

<div class="flex flex-col items-center gap-4 py-4">
	<div class="card card-compact w-3/6 bg-base-100 shadow-xl">
		<figure>
			<img src={data.project?.image} alt="User" />
		</figure>
		<div class="card-body">
			<!-- <div class="avatar">
				<div class="w-16 rounded-full">
					<img src={data.project.avatar} />
				</div>
			</div> -->
			<p>Glen Chaplin, UK, posted on 16/03/2024 at 2:44am</p>
			<h2 class="card-title text-4xl">{data.project?.title}</h2>
			<p class="text-xl">{data.project?.description}</p>
		</div>
	</div>
	{#if watching}
		<button class="btn w-fill" on:click={unwatchProject}>Unwatch</button>
	{:else}
		<button class="btn w-fill" on:click={watchProject}>Watch</button>
	{/if}
	<p class="text-center text-xl">Supplies needed / already received</p>
	<div class="card w-3/6 bg-base-100 shadow-xl">
		<div class="overflow-x-auto">
			<table class="table">
			  <!-- head -->
			  <thead>
				<tr>
				  <th>Name</th>
				  <th>Amount</th>
				  <th>Needed</th>
				</tr>
			  </thead>
			  <tbody>
				<!-- row  -->
				{#each data.project?.items ?? [] as item}
				<tr>
				  <td>{item.name}</td>
				  <td>{item.amount}</td>
				  <td>
					{#if item.needed}
					<input type="checkbox" class="checkbox" disabled checked />
					{:else}
					<input type="checkbox" class="checkbox" disabled />
					{/if}
				  </td>
				</tr>
				{/each}
			  </tbody>
			</table>
		  </div>
	</div>
</div>
	<!-- <p class="text-center text-xl py-2">Feed</p>
<div class="justify-center flex py-4">
	<div
		class="w-3/6 h-96 carousel carousel-vertical bg-base-100 rounded-box shadow-xl"
	>
		<div class="carousel-item h-96" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			25/3/2024 2:44am
			<br />
			&nbsp<br />
			Thank you for your support! I have obtained all the materials i need for my dress.
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			25/3/2024 2:44am
			<br />
			&nbsp<br />
			I NEED HELP
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			24/3/2024 2:44am
			<br />
			&nbsp<br />
			I need one more roll of silk!
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			23/3/2024 2:44am
			<br />
			&nbsp<br />
			I need some more red velvet!
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			22/3/2024 2:44am
			<br />
			&nbsp<br />
			I need some string!
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			21/3/2024 2:44am
			<br />
			&nbsp<br />
			Please provide me some apples.
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			17/3/2024 2:44am
			<br />
			&nbsp<br />
			I need SILK
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			16/3/2024 2:44am
			<br />
			&nbsp<br />
			Testing
		</div>
	</div>
</div> -->

