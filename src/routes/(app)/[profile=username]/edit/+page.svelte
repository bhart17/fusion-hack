<script lang="ts">
	import { goto } from '$app/navigation';

	import { doc, updateDoc } from 'firebase/firestore';

	const removeFalsy = <T extends Record<string, any>>(obj: T) =>
		Object.entries(obj).reduce((acc, [key, value]) => {
			if (value) {
				acc[key as keyof T] = value;
			}
			return acc;
		}, {} as Partial<T>);

	import { userData, user } from '$lib/firebase/client/auth';
	import type { UserDoc } from '$lib/firebase/types';
	import { firestore } from '$lib/firebase/client/firestore';
	import { uploadFile } from '$lib/firebase/client/storage';

	let previewUrl: string;
	let newPhoto: File;
	let uploading = false;
	let newUserData: Partial<UserDoc> = {
		bio: '',
		image: ''
	};

	$: isPhoto = $userData?.image || previewUrl;

	async function previewNewPhoto(event: Event) {
		const file: File = (event.target as HTMLInputElement).files![0];
		newPhoto = file;
		previewUrl = URL.createObjectURL(file);
	}

	async function save() {
		uploading = true;
		if (newPhoto) {
			newUserData.image = await uploadFile(newPhoto, `profilepics/${$user?.uid ?? ''}`);
		}
		const filtered = removeFalsy(newUserData);
		await updateDoc(doc(firestore.users, $user?.uid ?? ''), filtered);
		goto(`/@${$userData?.username}`);
		uploading = false;
	}
</script>

<svelte:head>
	<title>Edit Profile</title>
	<meta name="description" content="Edit your profile" />
</svelte:head>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-xl font-bold">Edit your account</h1>
	<form class="form-control w-full gap-4" on:submit|preventDefault={save}>
		<label for="bio"><span class="label-text">Bio</span></label>
		<textarea
			id="bio"
			class="textarea textarea-bordered w-full"
			placeholder={$userData?.bio ?? ''}
			bind:value={newUserData.bio}
		/>
		<label for="profilePhoto" class="flex flex-col"
			><span class="label-text"><div class="flex gap-2">Profile Photo</div></span>
			<div class="btn btn-circle w-24 h-24 avatar place-self-center" class:placeholder={!isPhoto}>
				<div class="w-24 rounded-full">
					{#if isPhoto}
						<img src={previewUrl ?? $userData?.image} alt="Avatar" />
					{:else}
						<span class="text-3xl">👤</span>
					{/if}
				</div>
			</div>
		</label>
		<input
			on:change={previewNewPhoto}
			id="profilePhoto"
			accept="image/*"
			type="file"
			class="hidden"
		/>
		<button
			class="btn btn-success btn-block"
			disabled={uploading || !(previewUrl || newUserData.bio)}>Save Changes</button
		>
	</form>
</div>

<style>
	textarea {
		resize: none;
	}
</style>
