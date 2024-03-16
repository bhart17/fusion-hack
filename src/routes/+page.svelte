<script lang="ts">
    import { signIn, signOut } from "$lib/firebase/login";
    import { user } from "$lib/firebase/client/auth";
</script>

<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


current user: {$user?.email}
<button class="btn" on:click={() => {signIn("user@test.com", "password")}}>Login</button>
<button class="btn" on:click={signOut}>Logout</button>

<button>
    <a href = "/login">Go to login page</a>
</button>