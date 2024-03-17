<script>
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/firebase/login';

	import Logo from '$lib/components/Logo.svelte';

	let email = '';
	let password = '';

	let state = 'none';
	async function handleSignIn() {
		state = 'loading';
		const status = await signIn(email, password);
		if (status) state = 'error';
		else goto('/home');
	}

	$: emailValid =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email.toLowerCase()
		);
</script>

<div class="h-screen flex flex-col">
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl" href="/"
				><div class="avatar">
					<div class="rounded-md">
						<Logo />
					</div>
				</div>
				FabricFusion</a
			>
		</div>
	</div>
	<div class="hero h-full bg-base-200">
		<div class="hero-content flex-col lg:flex-row-reverse max-w-4xl gap-10">
			<div class="text-center lg:text-left">
				<h1 class="text-5xl font-bold">Login now!</h1>
				<p class="py-6">
					Log in now to gain access to a vibrant community of fabric enthusiasts, exclusive project
					ideas, and support from fellow creators. Your journey into the world of fabric
					craftsmanship starts here!
				</p>
			</div>
			<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<form class="card-body" on:submit|preventDefault>
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							name="email"
							type="email"
							placeholder="email"
							class="input input-bordered"
							bind:value={email}
							required
						/>
					</div>
					<div class="form-control">
						<label class="label" for="password">
							<span class="label-text">Password</span>
						</label>
						<input
							name="password"
							type="password"
							placeholder="password"
							class="input input-bordered"
							bind:value={password}
							required
						/>
						<label class="label">
							<button class="label-text-alt link link-hover">Forgot password?</button>
						</label>
					</div>
					<p class:hidden={state !== 'error'} class="text-error text-center">
						That username and password doesnt seem to work
					</p>
					<div class="register-link">
						<p>Don't have an account? <a href="/signup"> Register </a></p>
					</div>
					<div class="form-control mt-6">
						<button
							class="btn btn-primary"
							on:click={handleSignIn}
							disabled={state === 'loading' || !emailValid || !password.length}>Login</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.register-link {
		text-align: center;
	}

	.register-link a:hover {
		text-decoration: underline;
	}
</style>
