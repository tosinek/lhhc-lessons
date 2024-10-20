<script lang="ts">
  export let showModal: boolean;

  let dialog: HTMLDialogElement;
  export let maxWidth = 800;

  $: if (dialog && showModal) dialog.showModal();

  const close = (e: Event & { target: HTMLElement }) => {
    if (e.target === dialog) dialog.close();
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  style="--max-width: {maxWidth}px;"
  on:click={close}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    {#if $$slots.header}
      <h2 class="header-flex mb-0">
        <slot name="header" />

        <button
          type="button"
          class="btn btn-primary btn-sm"
          on:click={() => dialog.close()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <!-- svelte-ignore a11y-autofocus -->
      </h2>
      <hr />
    {/if}

    <!-- showModal passed in for AnimalCard close button (conditionally shown if in modal & doesnt use header) -->
    <slot {showModal} />
  </div>
</dialog>

<style>
  .header-flex {
    display: flex;
    justify-content: space-between;
  }
  dialog {
    --body-color: white;
    width: min(var(--max-width), calc(100% - 2em));
    border-radius: 0.2em;
    border: none;
    padding: 0;
    margin-top: 2em;
    max-height: calc(100% - 4em);
    background-color: var(--body-color);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 20px;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  hr {
    margin-top: 0.5rem;
  }
  h2 {
    align-items: end;
    font-size: 1.5rem;
  }
  h2 > button {
    align-self: flex-start;
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
