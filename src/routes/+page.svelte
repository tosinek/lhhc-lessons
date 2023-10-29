<script lang="ts">
  import { goto } from "$app/navigation";

  // on form action success
  // goto("/" + email);
  let email = "";
  const redirect = () => {
    window.location = "/" + email;
    // goto("/" + email);
  };
</script>

<form>
  <label>
    Registration email
    <input name="email" type="email" bind:value={email} />
  </label>
  <button on:click={redirect}>Show my lessons</button>
</form>

<style>
</style>
