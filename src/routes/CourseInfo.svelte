<script lang="ts">
  import { desc } from "./[email]/courses";
  export let number;
  export let teachers;
  export let parties;
</script>

{#if number === "Friday party"}
  <strong> Program: </strong>
  <div class="grid">
    {#each parties[0] as party, index}
      {#if party}
        <div>{party}</div>
        <div>{parties[1][index]}</div>
      {/if}
    {/each}
  </div>
  <p><em>Check anytime for most up-to-date info</em></p>
{:else if number === "Saturday party"}
  <strong> Program: </strong>
  <div class="grid">
    {#each parties[3] as party, index}
      {#if party}
        <div>{party}</div>
        <div>{parties[4][index]}</div>
      {/if}
    {/each}
  </div>
  <p><em>Check anytime for most up-to-date info</em></p>
{:else}
  <p>{desc[number]}</p>
{/if}

<h2 style="margin-top: 3rem">{teachers}</h2>
{@html desc[teachers]}

<style>
  .grid {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0.2rem 1rem;
  }
</style>
