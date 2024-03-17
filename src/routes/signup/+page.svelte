<script lang="ts">
	import { user, userData } from '$lib/firebase/client/auth';
	import { firestore } from '$lib/firebase/client/firestore';
	import { signUp } from '$lib/firebase/login';
	import {
		doc,
		getCountFromServer,
		limit,
		query,
		setDoc,
		Timestamp,
		where
	} from 'firebase/firestore';

	import type { UserDoc } from '$lib/firebase/types';
	import { goto } from '$app/navigation';
	import { uploadFile } from '$lib/firebase/client/storage';

	let newUser: UserDoc = {
		donatedprojects: [],
		watching: [],
		email: '',
		name: '',
		username: '',
		hostprojects: [],
		followers: [],
		following: [],
		image: '',
		bio: ''
	};

	$: newUser.email = $user?.email ?? '';

	const usernameRegex = /^(?=[a-zA-Z0-9._]{3,16}$).*$/;

	let emailInput = '';
	let passwordInput = '';

	$: validAccount =
		emailInput
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			) && passwordInput.length >= 8;

	let loading = false;
	let isAvailable = false;
	let debounceTimer: NodeJS.Timeout;
	$: isValid = usernameRegex.test(newUser.username);
	$: isTouched = newUser.username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading;

	function checkAvailability() {
		isAvailable = false;
		clearTimeout(debounceTimer);
		if (!isValid) {
			loading = false;
			return;
		}
		loading = true;
		debounceTimer = setTimeout(async () => {
			// console.log(`❕ Checking availability of ${newUserData.username}`);
			const usernameQuery = query(
				firestore.users,
				where('username', '==', newUser.username),
				limit(1)
			);
			const count = await getCountFromServer(usernameQuery);
			isAvailable = !count.data().count;
			loading = false;
		}, 500);
	}

	async function confirmUser() {
		// console.log(`✅ Confirming user ${newUserData.username}`);
		await setDoc(doc(firestore.users, $user?.uid ?? ''), newUser);
		goto('/home');
	}

	let previewURL: string;
	let uploading = false;

	async function upload(event: Event) {
		uploading = true;
		const file: File = (event.target as HTMLInputElement).files![0];
		try {
			previewURL = URL.createObjectURL(file);
			newUser.image = await uploadFile(file, `profilepics/${$user?.uid ?? ''}`);
		} catch {
		} finally {
			uploading = false;
		}
	}
</script>

<svelte:head>
	<title>Create account</title>
	<meta name="description" content="Create your account" />
</svelte:head>

<div class="flex flex-col py-8 px-4 gap-4 items-center h-screen">
	{#if $user}
		{#if $userData}
			<a href="/home">Go Home</a>
		{:else}
			<form class="flex flex-col gap-4" on:submit|preventDefault>
				<label class="input input-bordered flex items-center gap-2">
					<input
						bind:value={newUser.username}
						on:input={checkAvailability}
						type="text"
						class="grow"
						placeholder="Username"
						class:input-error={!isValid && isTouched}
						class:input-warning={isTaken}
						class:input-success={isAvailable && isValid && !loading}
					/>
				</label>
				{#if loading}
					<p class="text-secondary text-sm text-center">
						Checking availability of @{newUser.username}...
					</p>
				{:else if !isValid && isTouched}
					<p class="text-error text-sm text-center">
						Must be 3-16 characters long, alphanumeric only
					</p>
				{:else if isValid && !isAvailable && !loading}
					<p class="text-warning text-sm text-center">
						@{newUser.username} is not available
					</p>
				{/if}
				<label class="input input-bordered flex items-center gap-2">
					<input bind:value={newUser.name} type="text" class="grow" placeholder="Name" />
				</label>
				<label class="flex items-center gap-2">
					<textarea bind:value={newUser.bio} class="grow textarea" placeholder="Bio" />
				</label>
				<label for="profilePhoto" class="flex flex-col"
					><div class="flex gap-2">Profile Photo</div>
					<div
						class="btn btn-circle w-24 h-24 avatar place-self-center"
						class:placeholder={!(previewURL || newUser.image)}
					>
						<div class="w-24 rounded-full">
							{#if previewURL || newUser.image}
								<img src={previewURL ?? newUser.image} alt="Avatar" />
							{:else}
								<span class="text-3xl">👤</span>
							{/if}
						</div>
					</div></label
				><input
					id="profilePhoto"
					on:change={upload}
					name="photoURL"
					accept="image/*"
					type="file"
					class="hidden"
				/>
				<button class="btn" on:click={confirmUser} disabled={(!isAvailable && !uploading) || !newUser.name.length}
					>Submit</button
				>
			</form>
		{/if}
	{:else}
		<form class="flex flex-col gap-4" on:submit|preventDefault>
			<label class="input input-bordered flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="w-4 h-4 opacity-70"
					><path
						d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
					/><path
						d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
					/></svg
				>
				<input bind:value={emailInput} type="email" class="grow" placeholder="Email" />
			</label>
			<label class="input input-bordered flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="w-4 h-4 opacity-70"
					><path
						fill-rule="evenodd"
						d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
						clip-rule="evenodd"
					/></svg
				>
				<input bind:value={passwordInput} type="password" class="grow" placeholder="Password" />
			</label>
			<button
				class="btn"
				on:click={() => signUp(emailInput, passwordInput)}
				disabled={!validAccount}>Submit</button
			>
		</form>
	{/if}
</div>
