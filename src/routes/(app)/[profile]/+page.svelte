<script lang="ts">
	import { signIn, signOut } from '$lib/firebase/login';
	import { user } from '$lib/firebase/client/auth';
</script>

<style>
.profilebar {
    display: flex;
    align-items: center;
    padding: 10px;
}

.avatar {
    margin-right: 20px;
}

.nameAndStats {
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 48px; /* Bigger name */
    color: #FFFFFF; /* White text */
    margin-bottom: 10px;
}

.stats {
    display: flex;
}

.stat {
    margin-right: 20px;
}

.number {
    color: #90EE90; /* Light green */
    font-size: 24px; /* Adjusted size */
}

.label {
    color: #90EE90; /* Light green */
    font-size: 18px; /* Adjusted size */
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
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
    </div>
    <div class="nameAndStats">
        <h2 class="name">Name</h2>
        <div class="stats">
            <div class="stat">
                <p class="number">0</p>
                <p class="label">Followers</p>
            </div>
            <div class="stat">
                <p class="number">0</p>
                <p class="label">Following</p>
            </div>
            <div class="stat">
                <p class="number">-1</p>
                <p class="label">Rating</p>
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
