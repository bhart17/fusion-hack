<script lang="ts">
	import { signIn, signOut } from '$lib/firebase/login';
	import { user } from '$lib/firebase/client/auth';
</script>

<div class="w-screen h-screen bg-red">
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
	<div class="bg-background"><p>insert hero inside this div</p></div>
</div>
