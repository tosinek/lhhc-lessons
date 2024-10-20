<script lang="ts">
  type Strings = "L sold out" | "L last spots" | "F sold out" | "F last spots";
  export let leaders: Strings;
  export let follows: Strings;
  export let registeredAs: "follow" | "leader" | undefined = undefined;
</script>

{#if registeredAs}
  <div class="registered {registeredAs === 'leader' ? 'leader' : 'follower'}">
    You
    {registeredAs === "leader" ? "lead" : "follow"}
  </div>
{/if}
<div class="bar">
  <div class="slider">
    <div
      class="slider-leaders"
      class:booked={leaders === "L sold out"}
      class:last={leaders === "L last spots"}
    >
      <span>
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
      </span>
    </div>

    <div
      class="slider-follows"
      class:booked={follows === "F sold out"}
      class:last={follows === "F last spots"}
    >
      <span>
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
      </span>
    </div>
  </div>
</div>

<style>
  .registered {
    padding: 0.1rem 1rem;
    line-height: 1;
    font-weight: 600;
    font-size: 0.8rem;
  }
  .leader {
    color: rgba(43, 144, 226, 1);
  }
  .follower {
    text-align: right;
    color: rgba(161, 39, 185, 1);
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
    font-size: 0.8rem;
  }
  .slider-leaders {
    background-color: rgba(43, 144, 226, 0.479);
    width: 100%;
    padding: 3px 1rem;
    color: rgb(240, 248, 255);
    display: flex;
    align-items: center;
  }
  .slider-leaders.last {
    background-color: rgba(43, 144, 226, 1);
  }
  .slider-follows {
    width: 100%;
    background-color: rgba(161, 39, 185, 0.452);
    text-align: right;
    padding: 3px 1rem;
    color: rgb(240, 248, 255);
  }
  .slider-follows.last {
    background-color: rgba(161, 39, 185, 1);
  }
  .booked {
    background-color: rgba(71, 49, 49, 0.349);
  }
</style>
