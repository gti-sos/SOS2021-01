<script>
  import {
    Nav,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    NavItem,
    NavLink,
    Button,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
  } from "sveltestrap";
  import { onMount } from "svelte";

  // Nav

  //Load stats
  let open1 = false;
  const toggle1 = () => (open1 = !open1);
  const toggle1P = () => {
    open1 = !open1;
    loadStats();
  };
  //Delete stats
  let open2 = false;
  const toggle2 = () => (open2 = !open2);
  const toggle2P = () => {
    open2 = !open2;
    deleteAllStats();
  };

  //API

  //Alerts
  let visible = true;
  let errorMsg = "";
  let okMsg = "";
  let okMsg1 = "";
  let fullQuery = "";
  var flag = false;

  const BASE_CONTACT_API_PATH = "/api/v2";

  let divorceStats = [];
  let error = null;

  let newStat = {
    country: "",
    date: "",
    "marriage-rate": "",
    "divorce-rate": "",
    "ratio-actual": "",
    "ratio-percent": "",
  };

  //Pagination
  let current_offset = 0;
  let limit = 10;

  let current_page = 1;
  let last_page = 1;

  let total = 0;

  onMount(getStats);
  getNumStats();

  //Functions
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/divorce-stats/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStats();
        errorMsg = "";
        okMsg = "Operación realizada con éxito";
      } else {
        if (res.status === 404) {
          errorMsg = "No existen datos que borrar";
        } else if (res.status === 500) {
          errorMsg = "No se han podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function searchStat() {
    console.log("Searching stat...");
    var msg = "";

    var campos = new Map(
      Object.entries(newStat).filter((o) => {
        return o[1] != "";
      })
    );
    let querySymbol = "?";
    for (var [clave, valor] of campos.entries()) {
      if( valor != null){
      msg += getClaveSpanish(clave) + "=" + valor + " ";
      querySymbol += clave + "=" + valor + "&";
    }
  }
    fullQuery = querySymbol.slice(0, -1);

    if (fullQuery != "") {
      const res = await fetch(
        BASE_CONTACT_API_PATH +
          "/divorce-stats/" +
          fullQuery +
          "&limit=" +
          limit +
          "&offset=" +
          current_offset
      );
      if (res.ok) {
        console.log("OK, busqueda realizada correctamente");
        const json = await res.json();
        divorceStats = json;
        var cuerpo = json.length;
        okMsg = " Resultado de la busqueda con " + msg;
        errorMsg = "";
        if (cuerpo === 0) {
          okMsg1 = "No se ha encontrado" + okMsg;
          okMsg = okMsg1;
        }
      } else {
        divorceStats = [];
        if (res.status === 404) {
          errorMsg = "No se encuentra el dato solicitado" + msg;
        } else if (res.status === 500) {
          errorMsg = "No se han podido acceder a la base de datos";
        }
        okMsg = "";

        console.log("ERROR!" + errorMsg);
      }
    } else {
      errorMsg = "Se necesita un campo a buscar";
      okMsg = "";
      flag = true;
      getStats();
    }
  }
  function getClaveSpanish(clave) {
    switch (clave) {
      case "country":
        return "País";
      case "date":
        return "Año";
      case "marriage-rate":
        return "Porcentaje de matrimonios	";
      case "divorce-rate":
        return "Porcentaje de divorcios";
      case "ratio-actual":
        return "Ratio actual	";
      case "ratio-percent":
        return "Ratio porcentual	";
    }
  }
  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/divorce-stats?limit=" +
        limit +
        "&offset=" +
        current_offset
    );

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      divorceStats = json;
      console.log(`We have received ${divorceStats.length} stats.`);
      if (flag == false) {
        console.log("es una busqueda");
        errorMsg = "";
      }
      flag = false;
      getNumStats()
    } else {
      if (natalityStats.length != 0) {
        okMsg = "";
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR! 404");
      }
      init = false;
    }
  }
  //contador de stats de BD
  async function getNumStats() {
    const res = await fetch(BASE_CONTACT_API_PATH + "/divorce-stats");
    if (res.ok) {
      const json = await res.json();
      total = json.length;
      console.log("Number of stats : " + total);
      changePage(current_page, current_offset);
    } else {
      errorMsg = "No se han encontrado datos.";
    }
  }
  //Calcula el rango entre dos valores
  function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  //Cambio de pagina
  function changePage(page, offset) {
    console.log("------Change page------");
    console.log("Params page: " + page + " offset: " + offset);
    last_page = Math.ceil(total / 10);
    console.log("new last page: " + last_page);
    if (page !== current_page) {
      console.log("enter if");
      current_offset = offset;
      current_page = page;
      console.log("page: " + page);
      console.log("current_offset: " + current_offset);
      console.log("current_page: " + current_page);
      getStats();
    }
    console.log("---------Exit change page-------");
  }

  async function deleteAllStats() {
    console.log("Deleting data...");

    const res = await fetch(BASE_CONTACT_API_PATH + "/divorce-stats/", {
      method: "DELETE",
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        divorceStats = [];
        errorMsg = "";
        okMsg = "Operación realizada con éxito";
      } else {
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function deleteStat(country, date) {
    console.log(`Deleting data with name ${country} and date ${date}`);

    const res = await fetch(
      BASE_CONTACT_API_PATH + "/divorce-stats/" + country + "/" + date,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        if (divorceStats.length === 1) {
          divorceStats = [];
          current_page = 1;
        }
        errorMsg = "";
        
        okMsg = "Operación realizada con éxito";
        getStats();
        
      } else {
        if (res.status === 404) {
          errorMsg = `No existe el dato ${country} con fecha ${date} para borrar`;
        } else if (res.status === 500) {
          errorMsg = "No se han podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function insertStat() {
    console.log("Inserting stat: " + JSON.stringify(newStat));

    if (
      newStat.country == null ||
      newStat.country == "" ||
      newStat.country == "NaN" ||
      newStat.date == null ||
      newStat.date == "" ||
      newStat.date == "NaN" ||
      newStat["marriage-rate"] == null ||
      newStat["marriage-rate"] == "" ||
      newStat["marriage-rate"] == "NaN" ||
      newStat["divorce-rate"] == null ||
      newStat["divorce-rate"] == "" ||
      newStat["divorce-rate"] == "NaN" ||
      newStat["ratio-actual"] == null ||
      newStat["ratio-actual"] == "" ||
      newStat["ratio-actual"] == "NaN" ||
      newStat["ratio-percent"] == null ||
      newStat["ratio-percent"] == "" ||
      newStat["ratio-percent"] == "NaN"
    ) {
      errorMsg = "Los datos a insertar son incorrectos, compruebe los campos";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    } else {
      newStat.date = parseInt(newStat.date);
      newStat["marriage-rate"] = parseFloat(newStat["marriage-rate"]);
      newStat["divorce-rate"] = parseFloat(newStat["divorce-rate"]);
      newStat["ratio-actual"] = parseFloat(newStat["ratio-actual"]);
      newStat["ratio-percent"] = parseFloat(newStat["ratio-percent"]);

      const res = await fetch(BASE_CONTACT_API_PATH + "/divorce-stats/", {
        method: "POST",
        body: JSON.stringify(newStat),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getStats();
          errorMsg = "";
          okMsg = "Operación realizada con éxito";
        } else {
          if (res.status == 409) {
            errorMsg =
              res.status +
              ": " +
              res.statusText +
              ". El recurso con pais = " +
              newStat.country +
              " y año = " +
              newStat.date +
              " ya existe";
          } else {
            errorMsg = res.status + ": " + res.statusText;
          }
          console.log("ERROR!" + errorMsg);
          okMsg = "";
        }
      });
    }
    getStats();
  }
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#" on:click={toggle1}>Cargar datos inciales</NavLink>
      <Modal isOpen={open1} {toggle1}>
        <ModalHeader {toggle1}>¿Cargar los datos iniciales?</ModalHeader>
        <ModalBody>
          Esta acción cargará los datos siempre y cuando no existan previamente.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" on:click={toggle1P}>Cargar</Button>
          <Button color="secondary" on:click={toggle1}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </NavItem>
    <NavItem>
      {#if divorceStats.length === 0}
        <NavLink disabled href="#" on:click={toggle2}
          >Borrar todos los datos</NavLink
        >
      {:else}
        <NavLink href="#" on:click={toggle2}>Borrar todos los datos</NavLink>
        <Modal isOpen={open2} {toggle2}>
          <ModalHeader {toggle2}>¿Borrar todos los datos?</ModalHeader>
          <ModalBody>Esta acción no se puede deshacer.</ModalBody>
          <ModalFooter>
            <Button color="danger" on:click={toggle2P}>Borrar</Button>
            <Button color="secondary" on:click={toggle2}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      {/if}
    </NavItem>
    <NavLink id="nav_div_analytics" href="/#/divorce-stats/divorceChart">Analítica tipo line</NavLink>
  
  <NavItem>
    <NavLink id="nav_div_analytics2" href="/#/divorce-stats/divorceChart2">Analítica tipo lollipop</NavLink>
  </NavItem>
  <NavItem>
    <NavLink id="nav_div_analytics3" href="/#/divorce-stats/divorceChart3">Analítica tipo donut</NavLink>
  </NavItem>
  </Nav>
  <h2>API de Divorcios y Matrimonios</h2>
  <p />

  <!-- Alerts -->
  {#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
  {/if}
  {#if okMsg}
    <p style="color: green">{okMsg}</p>
  {/if}

  <!-- Table -->
  <Table borderer>
    <thead>
      <tr>
        <th> País </th>
        <th>Año </th>
        <th>Porcentaje de matrimonios </th>
        <th>Porcentaje de divorcios </th>
        <th>Ratio actual </th>
        <th>Ratio porcentual </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          ><input
          id="insert_input_country"
            type="text"
            placeholder="China"
            bind:value={newStat.country}
          /></td
        >
        <td
          ><input
          id="insert_input_date"
            type="number"
            placeholder="2019"
            min="1900"
            bind:value={newStat.date}
          /></td
        >
        <td
          ><input
          id="insert_input_marriage_rate"
            type="number"
            placeholder="0.0"
            min="1"
            bind:value={newStat["marriage-rate"]}
          /></td
        >
        <td
          ><input
          id="insert_input_divorce_rate"
            type="number"
            placeholder="0.0"
            min="1"
            bind:value={newStat["divorce-rate"]}
          /></td
        >
        <td
          ><input
          id="insert_input_ratio_actual"
            type="number"
            placeholder="0.0"
            min="1"
            bind:value={newStat["ratio-actual"]}
          /></td
        >
        <td
          ><input
          id="insert_input_ratio_percent"
            type="number"
            placeholder="0.0"
            min="1.0"
            bind:value={newStat["ratio-percent"]}
          /></td
        >
        <td
          ><Button id="insert_button" color="secondary" on:click={insertStat}>Insertar</Button></td
        >
        <td>
          <Button id="search_button"color="primary" on:click={searchStat}>Buscar</Button>
        </td>
      </tr>

      {#each divorceStats as stat}
        <tr>
          <td>{stat.country}</td>
          <td>{stat.date}</td>
          <td>{stat["marriage-rate"]}</td>
          <td>{stat["divorce-rate"]}</td>
          <td>{stat["ratio-actual"]}</td>
          <td>{stat["ratio-percent"]}%</td>

          <td>
            <a href="#/divorce-stats/{stat.country}/{stat.date}">
              <Button color="primary">Editar</Button>
            </a>
          </td>
          <td
            ><Button
              color="danger"
              on:click={deleteStat(stat.country, stat.date)}>Borrar</Button
            ></td
          >
        </tr>
      {/each}
    </tbody>
  </Table>

  <Pagination ariaLabel="Web pagination">
    <PaginationItem class={current_page === 1 ? "disabled" : ""}>
      <PaginationLink
        previous
        id="pagination_back"
        href="#/divorce-stats"
        on:click={() => changePage(current_page - 1, current_offset - 10)}
      />
    </PaginationItem>
    {#each range(last_page, 1) as page}
      <PaginationItem class={current_page === page ? "active" : ""}>
        <PaginationLink
          previous
          id="pagination_current"
          href="#/divorce-stats"
          on:click={() => changePage(page, (page - 1) * 10)}
          >{page}</PaginationLink
        >
      </PaginationItem>
    {/each}
    <PaginationItem class={current_page === last_page ? "disabled" : ""}>
      <PaginationLink
        next
        id="pagination_forward"
        href="#/divorce-stats"
        on:click={() => changePage(current_page + 1, current_offset + 10)}
      />
    </PaginationItem>
  </Pagination>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h2 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
