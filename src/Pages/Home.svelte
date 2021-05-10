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
    Row,
  } from "sveltestrap";
</script>

<main>
  <h1>SOS2021-01</h1>
<div>
  <h2>Equipo</h2>
  <Container>
    <Col>
      <a href="http://github.com/19juaniyo99">Juan Buitrago Ruiz</a>
    </Col>
    <Col>
      <a href="http://github.com/Lucia2712">Lucia Castro Perez</a>
    </Col>
    <Col>
      <a href="http://github.com/AbramsM1A2">Abraham Corta Ramirez</a>
    </Col>
  </Container>
</div>
  <div>
  <h2>Descripción del proyecto</h2>
  <p>
    Análisis global de los años 2018-2019 y la relación existente
    entre: el número de nacimientos, la tasa de divorcios y la calidad de vida por ciudadano.
  </p>

  <Container>
    <Col>
      <a href="http://github.com/gti-sos/SOS2021-01"
        ><b>Repositorio: </b>http://github.com/gti-sos/SOS2021-01</a
      >
    </Col>
    <Col>
      <a href="http://sos2021-01.herokuapp.com"
        ><b>Enlace: </b>http://sos2021-01.herokuapp.com</a
      >
    </Col>
  </Container>
</div>
<div>
  <a href="/#/info">
    <Button color="info">Info</Button>
  </a>
</div>
<div>
  <h2>Análiticas</h2>
  <a href="/#/common-chart">
    <Button color="primary">Todas las APIs</Button>
  </a>
  <a href="/#/natality-stats/natalityCharts">
    <Button color="secondary">Natality-stats</Button>
  </a>
</div>
  
<div>
  <h2>APIs</h2>
  <Container>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Divorce-stats</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText
            >Fuente de datos sobre el divorcio. Tasa de matrimonios y divorcios, relación entre
            matrimonios y divorcios.</CardText
          >
          <a href="https://sos2021-01.herokuapp.com/api/v1/divorce-stats">
            <Button color="primary">API v1</Button></a
          >
          <a href="/#/divorce-stats">
            <Button color="primary">Interfaz</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/14948045/TzJoDg1Q"
            ><Button color="info">Documentación v1</Button></a
          >
        </CardBody>
        <CardFooter
          >desarrollado por
          <a href="https://github.com/19juaniyo99">Juan Buitrago Ruiz</a
          ></CardFooter
        >
      </Card>
    </Col>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Life-stats</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText
            >Fuente de datos del índice de calidad de vida por país, que está vinculado al 
            índice de poder adquisitivo y el índice de seguridad.</CardText
          >
          <a href="https://sos2021-01.herokuapp.com/api/v1/life-stats">
            <Button color="primary">API v1</Button>
          </a>
          <a href="/#/life-stats">
            <Button color="primary">Interfaz</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/14961437/TzJoDg1P">
            <Button color="info">Documentación v1</Button>
          </a>
        </CardBody>
        <CardFooter
          >desarrollado por
          <a href="https://github.com/Lucia2712">Lucia Castro Perez</a>
        </CardFooter>
      </Card>
    </Col>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Natality-stats</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>
            Ratios de natalidad y fertlidad de hombres y mujeres nacidos por año y
            país.
          </CardText>
          <a href="/api/v1/natality-stats"
            ><Button disabled color="primary">API v1</Button></a
          >
          <a href="/api/v2/natality-stats"
          ><Button color="primary">API v2</Button></a
        >
          <a href="/#/natality-stats"
            ><Button color="primary">Interfaz</Button></a
          >
          <a href="https://documenter.getpostman.com/view/14932491/TzJrCzRM"
            ><Button disabled color="info">Documentación v1</Button></a
          >
          <a href="https://documenter.getpostman.com/view/14932491/TzRSg7GK"
            ><Button color="info">Documentación v2</Button></a
          >
        </CardBody>
        <CardFooter
          >desarrollado por
          <a href="https://github.com/AbramsM1A2">Abraham Corta Ramírez</a
          ></CardFooter
        >
      </Card>
    </Col>
  </Container>
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
