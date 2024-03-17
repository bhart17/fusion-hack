<script lang="ts">
	import { signIn, signOut } from '$lib/firebase/login';
	import { user, userData } from '$lib/firebase/client/auth';
	import { firestore } from '$lib/firebase/client/firestore';
	import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

	export let data;

	$: ownPage = $user?.uid === data.uid;
	$: isFollowing = $userData?.following.includes(data.uid);

	let followCount = data.user.following.length;
	let followerCount = data.user.followers.length;

	async function handleFollow() {
		await updateDoc(doc(firestore.users, $user?.uid), { following: arrayUnion(data.uid) });
		await updateDoc(doc(firestore.users, data.uid), { followers: arrayUnion($user?.uid) });
		followerCount++;
	}

	async function handleUnfollow() {
		await updateDoc(doc(firestore.users, $user?.uid), { following: arrayRemove(data.uid) });
		await updateDoc(doc(firestore.users, data.uid), { followers: arrayRemove($user?.uid) });
		followerCount--;
	}
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="Profile" />
</svelte:head>

<div class="flex flex-col gap-4 p-4">
	<div class="flex items-center gap-4">
		<div class="avatar placeholder">
			<div class="w-48 h-48 rounded-full">
				{#if data.user.image}
					<img src={data.user.image} alt="Profile" />
				{:else}
					<span class="text-8xl">👤</span>
				{/if}
			</div>
		</div>
		<div class="flex flex-col">
			<div class="flex flex-col gap-2">
				<h2 class="text-4xl font-bold">{data.user.name}</h2>
				<h2 class="text-2xl">@{data.user.username}</h2>
				{#if ownPage}
					<a href={`/@${data.user.username}/edit`} class="btn btn-outline">Edit Profile</a>
				{:else if isFollowing}
					<button class="btn btn-outline" on:click={handleUnfollow}>Unfollow</button>
				{:else}
					<button class="btn btn-outline" on:click={handleFollow}>Follow</button>
				{/if}
			</div>
		</div>
	</div>
	<div class="stats shadow">
		<div class="stat place-items-center">
			<div class="stat-title">Followers</div>
			<div class="stat-value">{followerCount}</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Following</div>
			<div class="stat-value">{followCount}</div>
		</div>

		<div class="stat place-items-center">
			<div class="stat-title">Projects</div>
			<div class="stat-value">{data.user.hostprojects.length}</div>
		</div>
		<div class="stat place-items-center">
			<div class="stat-title">Donations</div>
			<div class="stat-value">{data.user.donatedprojects.length}</div>
		</div>
	</div>
	<h2 class="text-2xl font-bold">About me</h2>
	<p>{data.user.bio}</p>
</div>
