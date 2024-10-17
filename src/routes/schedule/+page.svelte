<script lang="ts">
  import Schedule from "../Schedule.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  if (typeof window !== "undefined") {
    console.log("🚀 ~ data:", data);
  }
</script>

<svelte:head>
  <title>Course Schedule LHHC 2024</title>
</svelte:head>

<Schedule {data} mode="schedule"></Schedule>
