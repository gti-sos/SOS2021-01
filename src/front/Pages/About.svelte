<script>
  import { Button, Nav, NavItem, NavLink } from "sveltestrap";
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink id="nav_home" href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_info" href="/#/info">Info</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_analytics" href="/#/analytics">Analíticas</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_integrations" href="/#/integrations"
        >Integraciones</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_about" href="/#/about">Acerca de</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h1>Acerca de</h1>
  </div>

  <div>
    <a href="https://drive.google.com/file/d/1johOWUdSpIc8F-rdAOl207uqXxjpal2i/view?usp=sharing"><Button class="mb-3" color="primary">Video divorce-stats</Button></a>
   
  </div>
  <div>
    <p>----------------------------------------------------------------</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/c6kVhb89NjA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div>
      <a href="https://youtu.be/c6kVhb89NjA"><Button color="primary">Video life-stats</Button></a>
    </div>
  </div>
  <div>
    <p>----------------------------------------------------------------</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/1eYJv-wR3VQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div>
      <a href="https://youtu.be/1eYJv-wR3VQ"><Button color="primary">Video natality-stats</Button></a>
    </div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  div {
    margin-bottom: 15px;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
