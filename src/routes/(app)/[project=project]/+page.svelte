<script lang="ts">
	export let data;

	import { user, userData } from '$lib/firebase/client/auth';
	import { firestore } from '$lib/firebase/client/firestore';
	import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	$: watching = $userData?.watching.includes(data.id);

	async function watchProject() {
		await updateDoc(doc(firestore.users, $user?.uid), { watching: arrayUnion(data.id) });
	}

	async function unwatchProject() {
		await updateDoc(doc(firestore.users, $user?.uid), { watching: arrayRemove(data.id) });
	}

	let donatingItems = data.project?.items.map((item) => ({name: item.name, amount: 0})) ?? [];

	async function donate() {}
</script>

<svelte:head>
	<title>Project Details</title>
	<meta name="description" content="Project Details" />
</svelte:head>

<div class="flex flex-col items-center gap-4 p-4">
	<div class="card max-w-xl w-full bg-base-100 shadow-xl">
		<figure>
			{#if data.project?.image === ''}
				<img
					src={'https://as2.ftcdn.net/v2/jpg/04/83/35/33/1000_F_483353394_baks2bsYpfB8muZTnZJpXSUd2OtP2Gdn.jpg'}
					alt="Sustainable clothing logo"
					class="max-h-96 w-full object-cover"
				/>
			{:else}
				<img
					src={data.project?.image}
					alt="Sustainable clothing logo"
					class="max-h-96 w-full object-cover"
				/>
			{/if}
		</figure>
		<div class="card-body">
			<a href={`/@${data.user?.username}`} class="btn">
				<div class="avatar">
					<div class="w-8 rounded-full">
						<img src={data.user?.image} alt="profile" />
					</div>
				</div>
				<p>{data.user?.name}</p>
			</a>
			<h2 class="card-title text-4xl">{data.project?.title}</h2>
			<p class="text-xl">{data.project?.description}</p>
		</div>
	</div>
	{#if watching}
		<button class="btn max-w-xl w-full" on:click={unwatchProject}>Unwatch</button>
	{:else}
		<button class="btn max-w-xl w-full" on:click={watchProject}>Watch</button>
	{/if}

	<p class="text-center text-xl">Supplies Needed</p>
	<div class="card bg-base-100 shadow-xl max-w-xl w-full">
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
	<p class="text-center text-xl">Donate</p>
	<div class="card bg-base-100 shadow-xl max-w-xl w-full">
		<div class="overflow-x-auto">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<th>Name</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					<!-- row  -->
					{#each donatingItems as item}
						<tr>
							<td>{item.name}</td>
							<td><input class="input w-full" type="number" bind:value={item.amount} /></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<button class="btn max-w-xl w-full" disabled>Submit Donation</button>

</div>
