<script lang="ts">
  import CourseInfo from "./CourseInfo.svelte";
  import Modal from "./Modal.svelte";
  import RegistrationSlider from "./RegistrationSlider.svelte";
  import { addToCalendar } from "./utils";
  export let data;
  export let mode: "personal" | "schedule" = "schedule";

  const processCourses = (courses) => {
    // split by days and timeslots
    const blocks = courses?.reduce((acc, course) => {
      if (!acc[course.day + "|" + course.time]) {
        acc[course.day + "|" + course.time] = [];
      }
      acc[course.day + "|" + course.time].push(course.number);
      return acc;
    }, {});
    return { blocks };
  };

  const { blocks } = processCourses(data.courses);
  let modalData = null;
  let showingNotRegistered = false;
</script>

{#if modalData}
  <Modal bind:showModal={modalData}>
    <div slot="header">
      {#if modalData.number.slice(0, 2) === "Nr"}
        {modalData.number} |
      {/if}
      {modalData.name}
    </div>

    <CourseInfo
      number={modalData.number}
      teachers={modalData.teachers}
      parties={data.parties}
    ></CourseInfo>
  </Modal>
{/if}

{#if mode === "personal"}
  {#if showingNotRegistered}
    <button on:click={() => (showingNotRegistered = false)}>
      Hide courses I haven't signed up for
    </button>
  {:else}
    <button on:click={() => (showingNotRegistered = true)}>
      Display complete schedule
    </button>
  {/if}
{/if}

<!-- po blocich -->
{#each Object.keys(blocks) as block, blockIndex}
  {@const [day, time] = block.split("|")}

  <!-- conditionally show block if when in personal mode there is a registered lesson in the block and showingNotRegistered is off -->
  {#if !(!showingNotRegistered && mode === "personal" && blocks[block].every((c) => !data.courses.find((course) => course.number === c).isRegistered))}
    <!-- display Friday/Sat/Sun -->
    {#if (!(mode === "personal" && !showingNotRegistered) && blockIndex > 0 && blocks[block].length > 0 && day !== Object.keys(blocks)[blockIndex - 1].split("|")[0]) || blockIndex === 0}
      <h1>{day}</h1>
    {/if}
    <h2>
      {#if !showingNotRegistered && mode === "personal"}
        {day}
      {/if}
      {time}
    </h2>
    <div class="row-block">
      {#each blocks[block] as course, i}
        {@const courseData = data.courses.find((c) => c.number === course)}

        {#if !(mode === "personal" && !courseData.isRegistered && !showingNotRegistered)}
          <div
            class="course"
            class:inactive={mode === "personal" && !courseData.isRegistered}
          >
            <div class="course-padded">
              <div class="course-type">
                <div class="left">
                  <div class="badge {courseData.type}">{courseData.type}</div>
                  {#if courseData.level}
                    <div class="badge level {courseData.level}">
                      {courseData.level}
                    </div>
                  {/if}
                </div>

                <div class="right">
                  <button
                    class="btn-sm secondary"
                    on:click={() => (modalData = courseData)}
                  >
                    info
                  </button>
                </div>
              </div>

              <div class="course-name">{courseData.name}</div>

              <div class="teachers">
                with <span class="bold">{courseData.teachers}</span>
              </div>

              {#if courseData.room}
                <div class="location">
                  @{courseData.room}
                </div>
              {/if}

              {#if courseData.type === "Party"}
                <div style="margin-top: 10px;">
                  <button
                    class="link color-primary"
                    on:click={() => (modalData = courseData)}
                  >
                    <b>Click to see up-to-date party program</b>
                  </button>
                </div>
              {/if}
            </div>

            <div class="reg-slider">
              <RegistrationSlider
                leaders={courseData.leaders}
                follows={courseData.follows}
                registeredAs={courseData.registeredAs}
              />
            </div>

            {#if courseData.isRegistered && mode === "personal"}
              <div class="course-padded">
                <div>
                  <a href="{addToCalendar(courseData)}}">
                    &plus; Add to Google calendar
                  </a>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/if}
{/each}

<style>
  h1,
  h2 {
    color: var(--font-color, black);
    margin-top: 1.2em;
    margin-bottom: 0.3em;
  }
  h1 {
    /* margin-top: 2rem; */
    margin-bottom: 0rem;
    font-size: 2rem;
  }
  h2 {
    font-size: 1.2rem;
    margin-top: 1.7em;
    /* margin-bottom: -0.7rem; */
  }
  .reg-slider {
    margin-bottom: 0;
  }

  .course-name {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    color: #484866;
    text-decoration: none;
  }

  .course-type {
    display: flex;
    gap: 0.4rem;
    margin-left: -5px;
    align-items: center;
  }
  .course-type .left {
    font-size: 0.9rem;
    display: flex;
    gap: 0.4rem;
  }
  .course-type .right {
    margin-left: auto;
  }
  .badge {
    background-color: rgb(138, 138, 138);
    border: 2px solid transparent;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 15px;
    line-height: 1;
    padding-inline: 0.5em;
    padding-block: 0.3em;
    font-weight: 600;
  }
  .level {
    background-color: transparent;
    color: rgb(138, 138, 138);
    border: 2px solid;
    background-color: rgb(138, 138, 138);
    color: white;
    border: 2px solid rgb(138, 138, 138);
  }

  .row-block {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }

  .course {
    background-color: rgb(253, 244, 244);
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    display: subgrid;
    transition: all 0.2s;
  }
  .course-padded {
    padding-inline: 1rem;
    padding-block: 1rem;
  }
  .course.inactive {
    filter: grayscale(1);
    background: lightgrey;
  }
  .course.inactive:hover {
    filter: none;
  }

  @media (max-width: 1000px) {
    .row-block {
      grid-template-columns: 1fr;
    }
  }

  .Lindy,
  .Charleston,
  .Solo {
    background-color: rgb(1, 126, 68);
  }
  .Shag {
    background-color: rgb(189, 0, 0);
  }
  .Balboa {
    background-color: rgb(165, 108, 2);
  }
  .Blues {
    background-color: rgb(21, 2, 133);
  }
  .West {
    background-color: rgb(13, 191, 235);
  }
  .Party {
    background: linear-gradient(
      90deg,
      rgba(247, 228, 0, 1) 0%,
      rgba(0, 255, 145, 1) 100%
    );
    background-repeat: no-repeat;
    color: black;
    border-color: #2dff6c;
  }
</style>
