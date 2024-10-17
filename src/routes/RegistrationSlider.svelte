<script lang="ts">
  type Strings = "L sold out" | "L last spots" | "F sold out" | "F last spots";
  export let leaders: Strings;
  export let follows: Strings;
  export let registeredAs: "follow" | "leader" | undefined = undefined;
</script>

<div class="bar">
  <div class="slider">
    <div
      class="slider-leaders"
      class:booked={leaders === "L sold out"}
      class:last={leaders === "L last spots"}
    >
      {#if registeredAs === "leader"}
        <input type="checkbox" name="" id="" checked />
      {/if}

      Leaders
      <strong>
        {#if leaders === "L sold out"}
          SOLD OUT
        {:else if leaders === "L last spots"}
          LAST SPOTS
        {:else}
          OPEN
        {/if}
      </strong>
    </div>

    <div
      class="slider-follows"
      class:booked={follows === "F sold out"}
      class:last={follows === "F last spots"}
    >
      Followers
      <strong>
        {#if follows === "F sold out"}
          SOLD OUT
        {:else if follows === "F last spots"}
          LAST SPOTS
        {:else}
          OPEN
        {/if}
      </strong>

      {#if registeredAs === "follow"}
        <input type="checkbox" name="" id="" checked />
      {/if}
    </div>
  </div>
</div>

<style>
  input {
    transform: scale(2);
    margin-inline: 10px;
    pointer-events: none;
  }
  .bar {
    display: flex;
    gap: 5px;
    margin-top: 5px;
  }
  .slider {
    display: flex;
    gap: 5px;
    width: 100%;
    height: 20px;
    font-size: 0.8rem;
  }
  .slider-leaders {
    background-color: rgba(43, 144, 226, 0.479);
    width: 100%;
    padding: 0px 1rem;
    color: rgb(240, 248, 255);
  }
  .slider-leaders.last {
    background-color: rgba(43, 144, 226, 1);
  }
  .slider-follows {
    width: 100%;
    background-color: rgba(161, 39, 185, 0.452);
    /* border-radius: 0 5px 5px 0; */
    text-align: right;
    padding: 0px 1rem;
    color: rgb(240, 248, 255);
  }
  .slider-follows.last {
    background-color: rgba(161, 39, 185, 1);
  }
  .booked {
    background-color: rgba(71, 49, 49, 0.349);
  }
</style>
