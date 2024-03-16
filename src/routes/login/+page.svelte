<script>
	import { signIn, signOut } from '$lib/firebase/login';
	import { user } from '$lib/firebase/client/auth';

	let email = '';
	let password = '';

	function handleLogin() {
		signIn(email, password);
		console.log('Email:', email);
		console.log('Password:', password);
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">FabricFusion</a>
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

<div class="container">
	<h2>Login</h2>
	<form on:submit|preventDefault={handleLogin}>
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
			<input type="email" class="grow" placeholder="Email" bind:value={email} required />
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
			<input type="password" class="grow" bind:value={password} required />
		</label>

		current user: {$user?.email}
		<button class="btn btn-outline" type="submit">Login</button>
	</form>
</div>

<form on:submit|preventDefault={signOut}>
	<button type="submit">Logout</button>
</form>

<style>
</style>
