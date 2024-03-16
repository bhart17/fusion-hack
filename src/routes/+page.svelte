<script lang="ts">
	import { signIn, signOut } from '$lib/firebase/login';
	import { user } from '$lib/firebase/client/auth';
</script>

<div class="">
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl">FabricFusion</a>
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
	<div class="bg-background"><div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col lg:flex-row-reverse">
		  <div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
		  </div>
		  <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body">
			  <div class="form-control">
				<label class="label">
				  <span class="label-text">Email</span>
				</label>
				<input type="email" placeholder="email" class="input input-bordered" required />
			  </div>
			  <div class="form-control">
				<label class="label">
				  <span class="label-text">Password</span>
				</label>
				<input type="password" placeholder="password" class="input input-bordered" required />
				<label class="label">
				  <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
				</label>
			  </div>
			  <div class="form-control mt-6">
				<button class="btn btn-primary">Login</button>
			  </div>
			</form>
		  </div>
		</div>
	  </div></div>
</div>
