<script>
    import { signIn, signOut } from "$lib/firebase/login";
    import { user } from "$lib/firebase/client/auth";

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
    <a class="btn btn-ghost text-xl" href = "/">FabricFusion</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href = "\login">Log In</a></li>
      <li>
        <details>
          <summary>
            Parent
          </summary>
          <ul class="p-2 bg-base-100 rounded-t-none">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">Log in now to gain access to a vibrant community of fabric enthusiasts, exclusive project ideas, and support from fellow creators. Your journey into the world of fabric craftsmanship starts here!</p>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" class="input input-bordered" bind:value={email} required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" class="input input-bordered" bind:value={password} required />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="register-link">
          <p>Don't have an account? <a href="/signup">
            Register
          </a></p>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" on:click={() => {signIn(email, password)}}>Login</button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  .register-link{
    text-align: center;
  }

  .register-link a:hover{
    text-decoration: underline;
  }
</style>

current user: {$user?.email}
<form on:submit|preventDefault={signOut}>
    <button type="submit">Logout</button>
</form>

