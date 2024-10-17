<script lang="ts">
  let email = "";
  const redirect = () => {
    if (typeof window !== "undefined") window.location = "/" + email;
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
  <button on:click={redirect}>Show my lessons</button>
</form>

<style>
  form {
    display: grid;
    gap: 10px;
    justify-items: center;
  }
  input {
    width: 100%;
    max-width: 500px;
    font-size: 1.2rem;
    padding: 10px;
    font-family: Verdana;
    text-align: center;
  }
  label {
    text-align: center;
  }
</style>
