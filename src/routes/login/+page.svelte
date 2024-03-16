<script>
  let email = '';
  let password = '';

  function handleLogin() {
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // You can add your login logic here, such as API calls for authentication
  }
</script>

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

    <button type="submit">Login</button>
  </form>
</div>
