<script lang="ts">
	export let data;

	import { user, userData } from '$lib/firebase/client/auth';
	import { firestore } from '$lib/firebase/client/firestore';
	import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	$: watching = $userData?.watching.includes(data.id);
	$: owned = $userData?.hostprojects.includes(data.id);

	async function watchProject() {
		await updateDoc(doc(firestore.users, $user?.uid), { watching: arrayUnion(data.id) });
	}

	async function unwatchProject() {
		await updateDoc(doc(firestore.users, $user?.uid), { watching: arrayRemove(data.id) });
	}

	let donatingItems = data.project?.items.map((item) => ({ name: item.name, amount: 0 })) ?? [];

	async function donate() {
		await updateDoc(doc(firestore.projects, data.id), {
			items: data.project?.items.map((item, i) => ({
				...item,
				have: item.have + donatingItems[i].amount
			}))
		});
		await updateDoc(doc(firestore.users, $user?.uid), { donatedprojects: arrayUnion(data.id) });
		goto(`/project-${data.id}/thanks`);
	}
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
					src='https://as2.ftcdn.net/v2/jpg/04/83/35/33/1000_F_483353394_baks2bsYpfB8muZTnZJpXSUd2OtP2Gdn.jpg'
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
				<thead>
					<tr>
						<th>Name</th>
						<th>Amount</th>
						<th>Have</th>
					</tr>
				</thead>
				<tbody>
					{#each data.project?.items ?? [] as item}
						<tr>
							<td>{item.name}</td>
							<td>{item.amount}</td>
							<td>{item.have}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<progress class="progress progress-primary w-full max-w-xl" value={data.project?.items.reduce((total, item) => total + item.have, 0)} max={data.project?.items.reduce((total, item) => total + item.amount, 0)}></progress>
	{#if !owned}
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
					{#each donatingItems as item, index}
						<tr>
							<td>{item.name}</td>
							<td
								><input
									class="input w-full"
									type="number"
									min="0"
									max={(data.project?.items[index].amount ?? 0) -
										(data.project?.items[index].have ?? 0)}
									bind:value={item.amount}
								/></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<button
		class="btn max-w-xl w-full"
		on:click={donate}
		disabled={donatingItems.reduce((total, item) => total + item.amount, 0) < 1}
		>Submit Donation</button
	>{/if}
</div>
