<script lang="ts">
    import { signIn, signOut } from "$lib/firebase/login";
    import { user } from "$lib/firebase/client/auth";
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">FabricFusion</a>
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

current user: {$user?.email}
<button class="btn" on:click={() => {signIn("user@test.com", "password")}}>Login</button>
<button class="btn" on:click={signOut}>Logout</button>

<button>
    <a href = "/login">Go to login page</a>
</button>
<h1 class="text-3xl font-bold">Currently Watching</h1>
<div class="flex w-full">
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
    <div class="divider divider-horizontal"></div>
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
    <div class="divider divider-horizontal"></div>
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
  </div>

<button>
    <a href = "/login">Go to login page</a>
</button>
<h1 class="text-3xl font-bold">Your projects</h1>
<div class="flex w-full">
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
    <div class="divider divider-horizontal"></div>
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
    <div class="divider divider-horizontal"></div>
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://www.akeneo.com/wp-content/uploads/2023/09/AdobeStock_589899369-scaled.jpeg" alt="Sustainable clothing logo" /></figure>
        <div class="card-body">
          <h2 class="card-title">Project: Insert project title</h2>
          <p>Project description</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">View</button>
          </div>
        </div>
      </div>
  </div>