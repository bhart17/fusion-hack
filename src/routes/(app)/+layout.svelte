<script>
	import { navigating } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import { userData } from '$lib/firebase/client/auth';
	import { signOut } from '$lib/firebase/login';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

{#if $navigating}
	<progress
		class="progress progress-primary fixed z-10 h-1 w-screen rounded-none opacity-100"
		in:fade={{ delay: 300, easing: cubicIn }}
		out:fade={{ easing: cubicOut }}
	/>
{/if}
<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/home" class="btn btn-ghost text-xl"
			><div class="avatar">
				<div class="rounded-md">
					<Logo />
				</div>
			</div>
			FabricFusion</a
		>
	</div>
	<ul class="menu menu-horizontal p-1 gap-2">
		<li><a class="btn" href={`/@${$userData?.username}`}>Profile</a></li>
		<button class="btn" on:click={signOut}>Logout</button>
	</ul>
</div>

<slot />
