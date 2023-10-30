<script lang="ts">
  let email = "";
  const redirect = () => {
    window.location = "/" + email;
  };
</script>

<form>
  <label for="email"> Registration email </label>
  <input
    id="email"
    name="email"
    type="email"
    bind:value={email}
    placeholder="@"
    autofocus
  />
  <div>
    <button on:click={redirect}>Show my lessons</button>
  </div>
</form>

<style>
  form {
    display: grid;
    gap: 10px;
  }
  input {
    width: 100%;
    font-size: 1.2rem;
    padding: 10px;
    font-family: Verdana;
    text-align: center;
  }
  label {
    text-align: center;
  }
  div:has(button) {
    display: flex;
    justify-content: center;
  }
  button {
    font-size: 1rem;
    padding: 10px;
    font-family: Verdana;
    border-radius: 5px;
    background-color: rgb(43, 144, 226);
    color: white;
    border: none;
    cursor: pointer;
  }
</style>
