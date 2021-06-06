<script>
  import {
    Button,
    Nav,
    NavLink,
    NavItem,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container,
  } from "sveltestrap";
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink disabled id="nav_home" href="/">Página Principal</NavLink>
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
      <NavLink id="nav_about" href="/#/about">Acerca de</NavLink>
    </NavItem>
  </Nav>

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
      Análisis global de los años 2018-2019 y la relación existente entre: el
      número de nacimientos, la tasa de divorcios y la calidad de vida por
      ciudadano.
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
              >Fuente de datos sobre el divorcio. Tasa de matrimonios y
              divorcios, relación entre matrimonios y divorcios.</CardText
            >
            <a href="https://sos2021-01.herokuapp.com/api/v1/divorce-stats">
              <Button class="mb-3" color="primary">API v1</Button></a>

            <a href="https://sos2021-01.herokuapp.com/api/v2/divorce-stats">
              <Button class="mb-3" color="primary">API v2</Button></a>

            <a href="/#/divorce-stats">
              <Button class="mb-3" color="primary">Interfaz</Button></a>

            <a href="/#/divorce-stats/divorceChart">
              <Button class="mb-3" color="secondary">Analítica (line)</Button></a>

            <a href="/#/divorce-stats/divorceChart2">
              <Button class="mb-3" color="secondary" >Analítica (lollipop)</Button></a>

            <a href="/#/divorce-stats/divorceChart3">
                <Button class="mb-3" color="secondary">Analítica (pie)</Button></a>
            
            <a href="https://drive.google.com/file/d/1johOWUdSpIc8F-rdAOl207uqXxjpal2i/view?usp=sharing"><Button class="mb-3" color="primary">Video</Button></a>

            <a href="https://documenter.getpostman.com/view/14948045/TzJoDg1Q"
              ><Button class="mb-3" color="info">Documentación v1</Button></a
            >
            <a href="https://documenter.getpostman.com/view/14948045/TzRVfRq7"
              ><Button class="mb-3" color="info">Documentación v2</Button></a
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
              >Fuente de datos del índice de calidad de vida por país, que está
              vinculado al índice de poder adquisitivo y el índice de seguridad.</CardText
            >
            <a href="https://sos2021-01.herokuapp.com/api/v1/life-stats">
              <Button class="mb-3" color="primary">API v1</Button>
            </a>
            <a href="https://sos2021-01.herokuapp.com/api/v2/life-stats">
              <Button class="mb-3" color="primary">API v2</Button>
            </a>
            <a href="/#/life-stats">
              <Button class="mb-3" color="primary">Interfaz</Button>
            </a>
            <a href="/#/life-stats/lifeCharts">
              <Button class="mb-3" color="secondary">Analítica (line)</Button>
            </a>
            <a href="/#/life-stats/lifeChart2">
              <Button class="mb-3" color="secondary">Analítica (bubble)</Button>
            </a>
            <a href="/#/life-stats/lifeChart3">
              <Button class="mb-3" color="secondary">Analítica (area)</Button>
            </a>      
            <a href="https://youtu.be/c6kVhb89NjA"><Button class="mb-3" color="primary">Video</Button></a>
            <a href="https://documenter.getpostman.com/view/14961437/TzJoDg1P">
              <Button class="mb-3" color="info">Documentación v1</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14961437/TzRSgnqQ">
              <Button class="mb-3" color="info">Documentación v2</Button>
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
              Ratios de natalidad y fertlidad de hombres y mujeres nacidos por
              año y país.
            </CardText>
            <a href="/api/v1/natality-stats"
              ><Button class="mb-3" color="primary">API v1</Button></a
            >
            <a href="/api/v2/natality-stats"
              ><Button class="mb-3" color="primary">API v2</Button></a
            >
            <a href="/#/natality-stats"
              ><Button class="mb-3" color="primary">Interfaz</Button></a
            >
            <a href="/#/natality-stats/natalityChart">
              <Button class="mb-3" color="secondary">Analítica 1</Button>
            </a>
            <a href="/#/natality-stats/natalityChart2">
              <Button class="mb-3" color="secondary">Analítica 2</Button>
            </a>
            <a href="https://youtu.be/1eYJv-wR3VQ"><Button class="mb-3" color="primary">Video</Button></a>
            <a href="https://documenter.getpostman.com/view/14932491/TzJrCzRM"
              ><Button class="mb-3" color="info">Documentación v1</Button></a
            >
            <a href="https://documenter.getpostman.com/view/14932491/TzRSg7GK"
              ><Button class="mb-3" color="info">Documentación v2</Button></a
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
  div {
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
