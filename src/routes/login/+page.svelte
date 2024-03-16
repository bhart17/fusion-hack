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

<style>
  /* Add your custom styles here */
  /* Example: */
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<div class="container">
  <h2>Login</h2>
  <form on:submit|preventDefault={handleLogin}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required>

    current user: {$user?.email}
    <button type="submit">Login</button>
  </form>
</div>

<form on:submit|preventDefault={signOut}>
    <button type="submit">Logout</button>
</form>

