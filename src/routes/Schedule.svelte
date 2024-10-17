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
    {#if (blockIndex > 0 && blocks[block].length > 0 && day !== Object.keys(blocks)[blockIndex - 1].split("|")[0]) || blockIndex === 0}
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
                <div class="label {courseData.type}">{courseData.type}</div>
                {#if courseData.level}
                  <div class="label level {courseData.level}">
                    {courseData.level}
                  </div>
                {/if}
              </div>

              <a href on:click={() => (modalData = courseData)}>
                <div class="course-name">
                  <span>{courseData.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 64 64"
                    fill="currentColor"
                  >
                    <path
                      d="M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M32.021,16 C33.555,16,35,17.346,35,18.981C35,20.727,33.555,22,32.021,22C30.225,22,29,20.727,29,18.981C29,17.346,30.225,16,32.021,16z M39,47h-5h-4h-5v-3l5-1V30h-4v-3l8-1v17l5,1V47z"
                    ></path>
                  </svg>
                </div>
              </a>

              <div class="teachers">
                with <span class="bold">{courseData.teachers}</span>
              </div>

              {#if courseData.room}
                <div class="location">
                  @{courseData.room}
                </div>
              {/if}
            </div>

            <!-- {#if courseData.leaders >= 0 && courseData.follows >= 0} -->
            <div class="reg-slider">
              <RegistrationSlider
                leaders={courseData.leaders}
                follows={courseData.follows}
                registeredAs={courseData.registeredAs}
              />
            </div>
            <!-- {/if} -->

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

{#if modalData}
  <Modal bind:showModal={modalData}>
    <div slot="header">
      {#if modalData.number.slice(0, 2) === "Nr"}
        {modalData.number} |
      {/if}
      {modalData.name}
    </div>

    <CourseInfo
      name={modalData.name}
      number={modalData.number}
      teachers={modalData.teachers}
      parties={data.parties}
    ></CourseInfo>
  </Modal>
{/if}

<style>
  h1,
  h2 {
    color: var(--font-color, black);
  }
  h1 {
    margin-top: 2rem;
    margin-bottom: 0rem;
    font-size: 2rem;
  }
  h2 {
    color: grey;
    font-size: 1.2rem;
    margin-top: 0.7rem;
    margin-bottom: -0.7rem;
  }
  .reg-slider {
    margin-bottom: 0;
  }

  svg {
    vertical-align: text-bottom;
    margin-left: auto;
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

  .course-name svg {
    font-size: 0.8rem;
    color: var(--primary-color, black);
  }
  .course-type {
    display: flex;
    gap: 0.4rem;
    margin-left: -5px;
    font-size: 0.9rem;
  }
  .label {
    background-color: rgb(138, 138, 138);
    border: 3px solid transparent;
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
    border: 3px solid rgb(138, 138, 138);
  }
  .number {
    position: absolute;
    top: 4px;
    right: 4px;
    transform: rotate(15deg);
    color: green;
    width: 2rem;
    height: 2rem;
  }
  .row-block {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    align-items: stretch;
    align-items: start;
    margin-block: 1rem;
  }
  .course {
    background-color: rgb(253, 244, 244);
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    display: subgrid;
    /* border-radius: var(--border-radius, 5px); */
    position: relative;
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
    border-color: #2d64ff;
  }
</style>
