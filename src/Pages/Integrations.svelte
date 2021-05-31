<script>
  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Nav,
    NavItem,
    NavLink,
  } from "sveltestrap";
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
      <NavLink id="nav_analytics" href="/#/analytics">Análiticas</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_integrations" href="/#/integrations"
        >Integraciones</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_about" href="/#/about">Acerca de</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h1>Integrations</h1>
  </div>
  <div>
    <Card class="mb-3">
      <CardHeader>
        <CardTitle><h2>natality-stats</h2></CardTitle>
      </CardHeader>
      <CardBody xs="3">
        <CardSubtitle />
        <CardText />
        <a href="/#/integrations/restcountries"
          ><Button class="mb-3" color="primary">restcountries</Button></a
        >
        <a href="/#/integrations/coinCap"
          ><Button class="mb-3" color="primary">coinCap</Button></a
        >
        <a href="/#/integrations/vatRates"
          ><Button class="mb-3" color="primary">vatRates</Button></a
        >
        <a href="/#/integrations/sanityStats">
          <Button class="mb-3" color="primary">sanity-stats</Button></a
        >
        <a href="/#/integrations/platformsStats">
          <Button class="mb-3" color="primary">platforms-stats</Button></a
        >
        <a href="/#/integrations/povertyRisks">
          <Button class="mb-3" color="primary">poverty-risks</Button></a
        >
        <a href="/#/integrations/illiteracy">
          <Button class="mb-3" color="primary">illiteracy</Button></a
        >
        <a href="/#/integrations/chidrenHIV">
          <Button class="mb-3" color="primary">children-with-hiv</Button></a
        >
        <a href="/#/integrations/childrenEmployment">
          <Button class="mb-3" color="primary">children-employment</Button></a
        >
        <a href="/#/integrations/unemployment">
          <Button class="mb-3" color="primary">unemployment-stats</Button></a
        >
      </CardBody>
    </Card>
  </div>
  <div>
    <Card class="mb-3">
      <CardHeader>
        <CardTitle><h2>life-stats</h2></CardTitle>
      </CardHeader>
      <CardBody>
        <CardSubtitle />
        <CardText />
        <a href="/#/integrations/externaCovid"
          ><Button class="mb-3" color="primary">Covid</Button></a
        >
        <a href="/#/integrations/integracion01"
          ><Button class="mb-3" color="primary">Renewable power</Button></a
        >
        <a href="/#/integrations/integracion02"
          ><Button class="mb-3" color="primary">Children out school</Button></a
        >
        <a href="/#/integrations/integracion03"
          ><Button class="mb-3" color="primary">Fire</Button></a
        >
        <a href="/#/integrations/integracion04"
          ><Button class="mb-3" color="primary">Education expenditure</Button
          ></a
        >
      </CardBody>
    </Card>
  </div>
  <div>
    <Card class="mb-3">
      <CardHeader>
        <CardTitle><h2>divorce-stats</h2></CardTitle>
      </CardHeader>
      <CardBody>
        <CardSubtitle />
        <CardText />
        <a href="/#/integrations/breakingbad"
          ><Button class="mb-3" color="primary"
            >Breaking Bad character´s API</Button
          ></a
        >
        <a href="/#/integrations/rickandmortyAPI"
          ><Button class="mb-3" color="primary"
            >Rick and Morty character API</Button
          ></a
        >
        <a href="/#/integrations/divorceandairdeathsintegration"
          ><Button class="mb-3" color="primary"
            >Divorce and Air Pollution´s Deaths Integration</Button
          ></a
        >
        <a href="/#/integrations/DivorceAndFoodConsumptionIntegration"
          ><Button class="mb-3" color="primary"
            >Divorce and Food Consumption Integration</Button
          ></a
        >
        <a href="/#/integrations/DivorceAndObesityIntegration"
          ><Button class="mb-3" color="primary"
            >Divorce and Obesity Integration</Button
          ></a
        >
        <a href="/#/integrations/SWUse"
          ><Button class="mb-3" color="primary"
            >Star Wars Species Integration</Button
          ></a
        >
        <a href="/#/integrations/BikeUse"
          ><Button class="mb-3" color="primary"
            >Renting Bikes Use by countries
          </Button></a
        >
      </CardBody>
    </Card>
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
  a {
    margin-bottom: 15px;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
