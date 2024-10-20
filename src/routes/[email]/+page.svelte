<script lang="ts">
  import { onMount } from "svelte";
  import { allCourses } from "./courses";
  import type { PageData } from "./$types";
  import Schedule from "../Schedule.svelte";
  export let data: PageData;
  if (typeof window !== "undefined") {
    console.log("🚀 ~ data:", data);
  }

  import { page } from "$app/stores";
  import { emailStore } from "../store";
</script>

<svelte:head>
  <title>Your schedule LHHC 2024</title>
</svelte:head>

<h1>Your schedule</h1>

{#if data?.error}
  <div class="red">
    Error: {data.error}
  </div>
  <div class="goback">
    <a href="/">Go back to the form</a>
  </div>
{:else}
  <Schedule {data} mode="personal"></Schedule>

  <div
    class="payment"
    class:paid={data?.registration?.data?.[15]?.toUpperCase() === "OK"}
  >
    {#if data?.registration?.data?.[15]?.toUpperCase() === "OK"}
      Your order is paid.
    {:else}
      Your payment hasn't been processed yet.
    {/if}
  </div>
{/if}

<!-- <h2>Upcoming events:</h2> -->
<!-- <div class="cards">
  {#each allCoursesWithRegistrations.filter((f) => f.registered && f.end.getTime() > Date.now()) as timeSlot}
    <CourseCard {timeSlot} {partyProgram} {locations} />
  {/each}
</div> -->

<!-- <h2>Past events:</h2>
  <div class="cards">
    {#each allCoursesWithRegistrations.filter((f) => f.registered && f.end.getTime() <= Date.now()) as timeSlot}
      <CourseCard {timeSlot} {partyProgram} {locations} />
    {/each}
  </div> -->

<style>
  .red {
    color: red;
  }
  .goback {
    margin-block: 1rem;
  }
  .payment {
    margin-block: 2rem;
    padding: 1rem;
    border-radius: 5px;
    background-color: rgb(255, 237, 235);
    color: red;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  }
  .payment.paid {
    background-color: rgb(237, 255, 235);
    color: green;
  }
</style>
