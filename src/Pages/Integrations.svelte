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
  <h1>Integrations</h1>
</div>
<div>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle><h2>natality-stats</h2></CardTitle>
    </CardHeader>
    <CardBody>
      <CardSubtitle />
      <CardText />
      <a href="/#/integrations/restcountries"
        ><Button color="primary">restcountries</Button></a
      >
      <a href="/#/integrations/coinCap"
        ><Button color="primary">coinCap</Button></a
      >
      <a href="/#/integrations/vatRates"
        ><Button color="primary">vatRates</Button></a
      >
      <a href="/#/integrations/sanityStats">
        <Button color="primary">sanity-stats</Button></a
      >
      <a href="/#/integrations/platformsStats">
        <Button color="primary">platforms-stats</Button></a
      >
      <a href="/#/integrations/povertyRisks">
        <Button color="primary">poverty-risks</Button></a
      >
      <a href="/#/integrations/illiteracy">
        <Button color="primary">illiteracy</Button></a
      >
      <a href="/#/integrations/chidrenHIV">
        <Button color="primary">children-with-hiv</Button></a
      >
      <a href="/#/integrations/childrenEmployment">
        <Button color="primary">children-employment</Button></a
      >
      <a href="/#/integrations/unemployment">
        <Button color="primary">unemployment-stats</Button></a
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
        ><Button color="primary">Covid</Button></a>
      <a href="/#/integrations/integracion01"
      ><Button color="primary">Renawable power</Button></a>
      <a href="/#/integrations/integracion02"
        ><Button color="primary">Children out school</Button></a>
  
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
        ><Button color="primary">Breaking Bad character´s API</Button></a
      >
      <a href="/#/integrations/rickandmortyAPI"
        ><Button color="primary">Rick and Morty character API</Button></a
      >
      <a href="/#/integrations/divorceandairdeathsintegration"
      ><Button color="primary">Divorce and Air Pollution´s Deaths Integration</Button></a
    >
    <a href="/#/integrations/DivorceAndFoodConsumptionIntegration"
      ><Button color="primary">Divorce and Food Consumption Integration</Button></a
    >
    <a href="/#/integrations/DivorceAndObesityIntegration"
      ><Button color="primary">Divorce and Obesity Integration</Button></a

    >
    <a href="/#/integrations/SWUse"
      ><Button color="primary">Star Wars Species Integration</Button></a
      
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
  div{
    margin-bottom: 15px;
  }
  b {
    color: #00c1ff;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
