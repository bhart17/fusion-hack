<script lang="ts">
	import { user, userData } from '$lib/firebase/client/auth';
	import { firestore } from '$lib/firebase/client/firestore';
	import { signUp } from '$lib/firebase/login';
	import {
		doc,
		getCountFromServer,
		limit,
		query,
		serverTimestamp,
		setDoc,
		Timestamp,
		where
	} from 'firebase/firestore';

	import type { UserDoc } from '$lib/firebase/types';
	import { goto } from '$app/navigation';

	let newUser: UserDoc = {
		dob: new Timestamp(0, 0),
		donatedprojects: [],
		email: '',
		name: '',
		username: '',
		hostprojects: [],
		followers: [],
		following: []
	};

	$: newUser.email = $user?.email ?? '';

	const usernameRegex = /^(?=[a-zA-Z0-9._]{3,16}$).*$/;

	let emailInput = '';
	let passwordInput = '';

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
				<label class="input input-bordered flex items-center gap-2">
					<input bind:value={newUser.name} type="text" class="grow" placeholder="Name" />
				</label>
				<button class="btn" on:click={confirmUser}>Submit</button>
			</form>
		{/if}
	{:else}
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
			<input bind:value={emailInput} type="text" class="grow" placeholder="Email" />
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
		<button class="btn" on:click={() => signUp(emailInput, passwordInput)}>Submit</button>
	{/if}
</div>
