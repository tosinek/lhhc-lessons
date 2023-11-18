<script lang="ts">
  export let timeSlot;
  export let partyProgram;
  export let locations;

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

  // format date as YYYYMMDDTMMHHSSZ
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${year}${month}${day}T${hours}${minutes}00Z`;
  };
</script>

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

    {#if timeSlot.type === "Party"}
      <div class="course-type" style="margin-top: 10px;">
        <b>Program:</b> <br />
        {#if timeSlot.day === "Friday"}
          {#each partyProgram[0] as i}
            {i}<br />
          {/each}
        {/if}
        {#if timeSlot.day === "Saturday"}
          {#each partyProgram[1] as i}
            {i}<br />
          {/each}
        {/if}
      </div>
    {/if}
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

<style>
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
</style>
