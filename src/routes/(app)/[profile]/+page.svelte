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

<style>
.profilebar {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid white;
}

.avatar {
    margin-right: 20px;
}

.nameAndStats {
    display: flex;
    flex-direction: column;
}

.nameContainer {
    display: flex;
    align-items: center;

}

.name {
    font-size: 48px; /* Bigger name */
    color: #FFFFFF; /* White text */
    margin-bottom: 10px;
    padding: 0 20px 0 0 ;
}

.stats {
    display: flex;

}

.number {
    color: white; /* Light green */
    font-size: 24px; /* Adjusted size */
    text-align: center;
}

.label {
    color: white; /* Light green */
    font-size: 18px; /* Adjusted size */
    text-align: center;
}

</style>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/home">FabricFusion</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="\login">Log In</a></li>
			<li>
				<details>
					<summary> Parent </summary>
					<ul class="p-2 bg-base-100 rounded-t-none">
						<li><a>Link 1</a></li>
						<li><a>Link 2</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
</div>

<div class="profilebar">
    <div class="avatar">
        <div class="w-48 h-48 rounded-full">
            <img src={data.user.image}/>
        </div>
    </div>
    <div class="nameAndStats">
        <div class="nameContainer">
        <h2 class="name">{data.user.name}</h2>
            {#if ownPage}
                <button class="btn btn-outline">Edit Profile</button>
            {:else}
                {#if isFollowing}
                <button class="btn btn-outline" on:click={handleUnfollow}>Unfollow</button>
                {:else}
                <button class="btn btn-outline" on:click={handleFollow}>Follow</button>
                {/if}
            {/if}
        </div>
        <div class="stats">
            <div class="stat">
                <p class="number">{followerCount}</p>
                <p class="label">Followers</p>
            </div>
            <div class="stat">
                <p class="number">{followCount}</p>
                <p class="label">Following</p>
            </div>
            <div class="stat">
                <p class="number">{data.user.hostprojects.length}</p>
                <p class="label">Projects</p>
            </div>
            <div class="stat">
                <p class="number">{data.user.donatedprojects.length}</p>
                <p class="label">Donations</p>
            </div>
        </div>
    </div>
</div>





current user: {$user?.email}
<button
	class="btn"
	on:click={() => {
		signIn('user@test.com', 'password');
	}}>Login</button
>
<button class="btn" on:click={signOut}>Logout</button>

<button>
	<a href="/login">Go to login page</a>
</button>
