<script lang="ts">
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

Sync status:
{data.courses}

<form method="POST">
  <button>Sync</button>
</form>

{#if form}
  {JSON.stringify(form)}
{/if}

<style>
</style>
