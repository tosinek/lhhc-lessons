<script>
  import "../app.css";
</script>

<div class="page">
  <div class="nav-bg" />
  <div class="nav">LHHC 2024</div>
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .nav-bg {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
    background-color: rgb(43, 144, 226);
  }
  .nav {
    grid-column: 2 / 3;
    grid-row: 1 /2;
    padding-inline: clamp(0rem, 3vw, 1rem);
    padding-block: 1rem;
    font-size: 2rem;
    text-align: center;
    color: white;
  }
  .content {
    padding-inline: clamp(1rem, 3vw, 0rem);
    padding-block: 1rem;
    grid-column: 2 / 3;
    grid-row: 2 /3;
  }
  .page {
    display: grid;
    grid-template-columns: 1fr minmax(200px, 400px) 1fr;
    gap: 1rem 0;
    grid-template-rows: auto 1fr;
  }
  @media (max-width: 400px) {
    .nav,
    .content {
      padding: 1rem;
      padding: 1rem;
    }
  }
</style>
