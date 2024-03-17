<script lang="ts">
	import { signIn, signOut } from '$lib/firebase/login';
	import { user, userData } from '$lib/firebase/client/auth';
	import { firestore } from '$lib/firebase/client/firestore';
	import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import { uploadFile } from '$lib/firebase/client/storage';

	let newProject = {
		active: true,
		description: '',
		host: $user?.uid ?? '',
		image: '',
		title: '',
		uploaded: 0,
		items: [{ name: '', amount: 0, needed: true }]
	};

	async function uploadProject() {
		const newDoc = doc(firestore.projects);
		await setDoc(newDoc, newProject);
		await updateDoc(doc(firestore.users, $user?.uid ?? ''), {
			hostprojects: arrayUnion(newDoc.id)
		});
		goto('/home');
	}

	let previewURL: string;
	let uploading = false;

	async function upload(event: Event) {
		uploading = true;
		const file: File = (event.target as HTMLInputElement).files![0];
		try {
			previewURL = URL.createObjectURL(file);
			newProject.image = await uploadFile(file, `projects/${crypto.randomUUID()}`);
		} catch {
		} finally {
			uploading = false;
		}
	}
</script>

<svelte:head>
	<title>New Project</title>
	<meta name="description" content="New Project" />
</svelte:head>

<div class="justify-center flex py-4">
	<div class="card w-full max-w-xl bg-base-100 shadow-xl">
		<figure>
			{#if previewURL}<img src={previewURL} alt="Project" />{:else}<img
					src="./placeholder.svg"
					alt="Project"
				/>{/if}
		</figure>
		<div class="card-body">
			<label for="photo" class="flex flex-col"
				><div class="flex gap-2 btn">Upload Photo</div>
			</label><input
				id="photo"
				on:change={upload}
				name="photoURL"
				accept="image/*"
				type="file"
				class="hidden"
			/>
			<div class="prompt">
				<h2 class="label">Title</h2>
				<input
					type="text"
					placeholder="project title"
					class="input input-bordered w-full"
					bind:value={newProject.title}
				/>
			</div>
			<div>
				<h2 class="label">Description</h2>
				<textarea
					class="textarea textarea-bordered w-full"
					placeholder="description"
					bind:value={newProject.description}
				></textarea>
			</div>
			<form class="flex flex-col gap-2" on:submit|preventDefault>
				<h2 class="label">Items</h2>
				{#each newProject.items as item}
					<div class="flex gap-2">
						<input
							type="text"
							placeholder="Item"
							class="input input-bordered w-full max-w-xs"
							bind:value={item.name}
						/>
						<input
							type="number"
							placeholder="Amount"
							class="input input-bordered w-full max-w-xs"
							bind:value={item.amount}
						/>
					</div>
				{/each}
				<button
					id="addItemButton"
					class="btn"
					on:click={() => {
						newProject.items.push({ name: '', amount: 0, needed: true });
						newProject.items = newProject.items;
					}}>+</button
				>
			</form>
			<div class="card-actions justify-end">
				<button class="btn btn-primary" on:click={uploadProject}>Upload</button>
			</div>
		</div>
	</div>
</div>
