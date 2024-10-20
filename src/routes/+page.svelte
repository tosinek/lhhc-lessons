<script lang="ts">
  let email = "";
  const redirect = () => {
    if (typeof window !== "undefined" && email) window.location = "/" + email;
  };
  const handleEnter = (e) => {
    console.log("🚀 ~ handleEnter ~ e:", e);
    if (e.key === "Enter") redirect();
  };
</script>

<div class="form">
  <label for="email"> Registration email </label>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    id="email"
    name="email"
    type="email"
    bind:value={email}
    placeholder="@"
    autofocus
    on:keypress={handleEnter}
  />
  <button type="submit" on:click={redirect}>Show my lessons</button>
</div>

<style>
  .form {
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
