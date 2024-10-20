<script lang="ts">
  import { page } from "$app/stores";
  import "../app.css";
  import { emailStore } from "./store";
</script>

<div class="page-layout">
  <div class="nav-bg" />
  <div class="header">
    <img src="/logo.png" alt="Logo" width="64" height="64" />

    <div class="header-texts">
      LHHC 2024
      <nav>
        <a href="/schedule" class:active={$page.url.pathname === "/schedule"}>
          Lessons
        </a>
        <a href="/{$emailStore ?? ''}" class:active={$page.params?.email}>
          My Schedule
        </a>
      </nav>
    </div>
  </div>
  <div class="content">
    <slot />
  </div>

  <footer>
    I would appreciate feedback on this app. Send me an <a
      href="mailto:tosinek@gmail.com">email</a
    >. Ideas for improvements are very welcome! Tom
  </footer>
</div>

<style>
  .page-layout {
    display: grid;
    grid-template-columns: 1fr minmax(auto, 1200px) 1fr;
    gap: 1rem 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh; /* make the footer stick to the bottom */
  }

  .nav-bg {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
    background-color: var(--brand-color);
  }
  .header-texts {
    padding-inline: clamp(0rem, 3vw, 1rem);
    padding-block: 1rem;
    font-size: 2rem;
    text-align: center;
    color: white;
  }
  .header {
    grid-column: 2 / 3;
    grid-row: 1 /2;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    padding-inline: clamp(1rem, 3vw, 0rem);
    padding-block: 1rem;
    grid-column: 2 / 3;
    grid-row: 2 /3;
  }

  @media (max-width: 400px) {
    .header,
    .content {
      padding: 0 1rem;
      padding: 0 1rem;
    }
    .page-layout {
      grid-template-columns: 1fr;
    }
  }
  nav {
    font-size: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  nav a {
    color: white;
    text-decoration: none;
  }
  nav a.active {
    font-weight: 800;
  }

  footer {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
    padding-inline: clamp(0rem, 3vw, 1rem);
    padding-block: 1rem;
    font-size: 1rem;
    text-align: center;
    color: white;
    background-color: var(--brand-color);
  }
</style>
