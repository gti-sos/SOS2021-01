<script>
  import {
    Button,
    Icon,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
  } from "sveltestrap";
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Volver</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>natality-stats integrations</h2>
    
        <a href="/#/integrations/restcountries">restcountries</a>  
        <a href="/#/integrations/vatRates">vatRates</a>  
  </div>
<div>
  <h2>life-stats integrations</h2>
</div>

<div>
  <h2>divorce-stats integrations</h2>
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
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
