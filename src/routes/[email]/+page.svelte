<script lang="ts">
  import { onMount } from "svelte";
  import { allCourses } from "./courses";
  // import type { PageData } from "./$types";
  // export let data: PageData;

  let loading = false;
  let userCourses = [];
  let userData = [];

  export let data;
  console.log("🚀 ~ file: +page.svelte:12 ~ email:", data);

  onMount(() => {
    loading = true;
    fetch(`/?email=${data.email}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);

        userData = res[0];
        userCourses = res[0].slice(4, 18);
        console.log(userData);

        loading = false;
      });
  });

  $: allCoursesWithRegistrations = allCourses.map((course, index) => {
    const filtered = userCourses.filter((f) =>
      new RegExp(course.name.slice(0, 6)).test(f)
    );
    if (filtered.length) {
      const parts = filtered[0].split(" ");
      course.registered = parts[parts.length - 1];
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
{#if loading}
  <div>Loading....</div>
{:else}
  <div class="cards">
    {#each allCoursesWithRegistrations.filter((f) => f.registered) as timeSlot}
      <div class="card">
        <div class="course">
          <div class="course-name">{timeSlot.name}</div>
          {#if timeSlot.type !== "Party"}
            <div class="course-type">
              {timeSlot.level}
              {timeSlot.type}
            </div>
          {/if}
        </div>

        <div class="info">
          {timeSlot.day}
          {timeSlot.time}
          {#if timeSlot.registered === "LEADER" || timeSlot.registered === "FOLLOWER"}
            as {timeSlot.registered}
          {/if}
          <!-- <div class="location">location to be announced</div> -->
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .cards {
    display: grid;
    gap: 2rem 2rem;
    padding: 1rem;
    grid-template-columns: minmax(200px, 450px);
  }
  .card {
    /* border: 1px solid black; */
    background-color: rgb(253, 244, 244);
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    display: grid;
    border-radius: 5px;
  }
  .course,
  .info {
    border-radius: 5px 5px 0 0;
    padding-inline: 1rem;
    padding-block: 1rem;
    text-align: center;
  }
  .course {
    background-color: rgb(255, 190, 183);
    font-family: monospace;
  }
  .info {
    /* background-color: rgb(255, 237, 235); */
    /* color: green; */
  }
  .course-name {
    font-size: 1.3rem;
  }
  .course-type {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 4px;
    font-weight: 700;
  }
  .location {
    color: grey;
    margin-top: 10px;
  }
</style>
