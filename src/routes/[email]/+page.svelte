<script lang="ts">
  import { onMount } from "svelte";
  import { allCourses } from "./courses";
  import type { PageData } from "./$types";
  import CourseCard from "./CourseCard.svelte";
  export let data: PageData;

  /**
   * todo: fonty
   * todo: vyzkouset si WL registraci ze se nezobrazi
   * todo: razeni probehly lekci (next vs past)
   * todo upsell volno na lekcich
   * todo zrusene registrace
   * todo registrace vice lidi na jeden email
   */

  let loading = false;
  let userCourses = [];
  let userData = [];
  let locations = [];
  let partyProgram = [[], []];
  let err = null;

  onMount(() => {
    loading = true;
    fetch(`/?email=${data.email}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          err = res.error;
          return;
        }

        userData = res.data[0];
        locations = res.places;
        partyProgram = res.party;

        userCourses = res.data[0].slice(4, 18);
      })
      .catch((e) => {
        console.warn(e);
        userData = [];
        userCourses = [];
      })
      .finally(() => {
        loading = false;
      });
  });

  $: allCoursesWithRegistrations = allCourses.map((course, index) => {
    const filtered = userCourses.filter((f) => {
      if (course.number) {
        return new RegExp("^" + course.number).test(f);
      } else {
        return false;
      }
    });
    if (filtered.length) {
      const parts = filtered[0].split(" ");
      course.registered = parts[parts.length - 1]; // FOLLOWER / LEADER
    }

    if (course.name === "Friday party" && userCourses[4] === "Ano / Ja / Yes") {
      course.registered = "COMING";
    }
    if (
      course.name === "Saturday party" &&
      userCourses[10] === "Ano / Ja / Yes"
    ) {
      course.registered = "COMING";
    }
    return course;
  });
</script>

<h1>Your schedule</h1>
{#if data.email}
  <div class="email">({data.email})</div>
{/if}

{#if loading}
  <p>Loading....</p>
{:else if err}
  <p style="color: red; font-weight: 700;">
    {err}
  </p>
{:else if !userData.length}
  <p>No data</p>
{:else}
  <h2>Upcoming events:</h2>
  <div class="cards">
    {#each allCoursesWithRegistrations.filter((f) => f.registered && f.end.getTime() > Date.now()) as timeSlot}
      <CourseCard {timeSlot} {partyProgram} {locations} />
    {/each}
  </div>

  <h2>Past events:</h2>
  <div class="cards">
    {#each allCoursesWithRegistrations.filter((f) => f.registered && f.end.getTime() <= Date.now()) as timeSlot}
      <CourseCard {timeSlot} {partyProgram} {locations} />
    {/each}
  </div>

  <div class="payment" class:paid={userData[22]}>
    {#if userData[22]}
      Your order is paid.
    {:else}
      Your payment hasn't been processed yet.
    {/if}
  </div>

  <div class="feedback">
    For feedback, send us an <a href="mailto:tosinek@gmail.com">email</a>.
  </div>
{/if}

<style>
  h1 {
    margin-block: 0;
    text-align: center;
    font-size: 1.5rem;
    /* justify-self: flex-start; */
  }
  h2 {
    font-size: 1.2rem;
    margin: 2rem 0 1rem;
  }
  h1,
  h2,
  .email {
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
  }
  .feedback {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
  .cards {
    --border-radius: 10px;
    display: grid;
    margin-block: 0.5rem;
    gap: 2rem 2rem;
    grid-template-columns: minmax(200px, 450px);
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
