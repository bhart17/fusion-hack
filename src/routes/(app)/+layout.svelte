<script>
	import Logo from "$lib/components/Logo.svelte";
	import { userData } from "$lib/firebase/client/auth";
	import { signOut } from "$lib/firebase/login";
</script>
<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/home" class="btn btn-ghost text-xl"><div class="avatar">
            <div class="rounded-md">
                <Logo />
            </div>
        </div>FabricFusion</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href={`/@${$userData?.username}`}>Profile</a></li>
			<button  on:click={signOut}>Logout</button>
		</ul>
	</div>
</div>

<slot />