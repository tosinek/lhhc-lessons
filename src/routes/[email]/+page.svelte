<script lang="ts">
  import { onMount } from "svelte";
  import { allCourses } from "./courses";
  import type { PageData } from "./$types";
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

  // format date as YYYYMMDDTMMHHSSZ
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${year}${month}${day}T${hours}${minutes}00Z`;
  };

  const addToCalendar = (item, returnTitle = false) => {
    const location = "DEPO2015, Pilsen, Czech Republic";
    const description = item.name + " with " + item.teachers;

    const title =
      "LHHC 2023: " +
      (item.type === "Party"
        ? item.name
        : item.type + (item.level ? " " + item.level : "") + " - " + item.name);

    if (returnTitle) return title;

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&location=${encodeURIComponent(location)}&dates=${formatDate(
      item.start
    )}/${formatDate(item.end)}&details=${encodeURIComponent(description)}`;
  };

  $: getLocation = (timeSlot) => {
    const no = timeSlot.number?.match(/\d{2}/);
    if (no) {
      return locations[parseInt(no)];
    } else if (timeSlot.name === "Saturday party") {
      return locations[locations.length - 1];
    } else if (timeSlot.name === "Friday party") {
      return locations[locations.length - 2];
    }
    return "location to be announced";
  };
</script>

<h1>Your schedule</h1>
{#if data.email}
  ({data.email})
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
  <div class="payment" class:paid={userData[22]}>
    {#if userData[22]}
      Your order is paid.
    {:else}
      Your payment hasn't been processed yet.
    {/if}
  </div>

  <div class="cards">
    {#each allCoursesWithRegistrations.filter((f) => f.registered) as timeSlot}
      <div class="card">
        <div class="course">
          <div class="course-name">{timeSlot.number || ""} {timeSlot.name}</div>
          {#if timeSlot.type !== "Party"}
            <div class="course-type">
              {timeSlot.level}
              {timeSlot.type}
            </div>
          {/if}
          <div class="course-type">
            with {timeSlot.teachers}
          </div>
        </div>

        <div class="info">
          {timeSlot.day}
          {timeSlot.time}
          {#if timeSlot.registered === "LEADER" || timeSlot.registered === "FOLLOWER"}
            as {timeSlot.registered}
          {/if}
          <div class="location">@{getLocation(timeSlot)}</div>

          <div class="calendar">
            <a href={addToCalendar(timeSlot)} target="_blank"
              >Add to your Google calendar</a
            >
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  h1 {
    margin-block: 0;
    font-size: 1.5rem;
    justify-self: flex-start;
  }
  .cards {
    --border-radius: 10px;
    display: grid;
    margin-block: 2rem;
    gap: 2rem 2rem;
    grid-template-columns: minmax(200px, 450px);
  }
  .card {
    background-color: rgb(253, 244, 244);
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    display: grid;
    border-radius: var(--border-radius, 5px);
  }
  .course,
  .info {
    padding-inline: 1rem;
    padding-block: 1rem;
    text-align: center;
  }
  .course {
    border-radius: var(--border-radius, 5px) var(--border-radius, 5px) 0 0;
    background-color: rgb(255, 190, 183);
    background-color: aliceblue;
    font-family: monospace;
  }
  .info {
    border-radius: 0 0 var(--border-radius, 5px) var(--border-radius, 5px);
    background-color: rgb(43, 144, 226);
    color: white;
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
    margin-top: 10px;
  }
  .calendar {
    margin-top: 10px;
    font-size: 0.8em;
  }
  .calendar a {
    color: white;
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
