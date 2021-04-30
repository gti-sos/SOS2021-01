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
    UncontrolledAlert,
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

  let fullQuery = "";

  const BASE_CONTACT_API_PATH = "/api/v1";

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
  let offset = 0;
  let limit = 10;

  let current_page = 1;
  let last_page = 1;
  let per_page = limit;
  let from = 1;
  let to = 1;
  let total = 0;

  let loading = true;

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
        okMsg = "Operación realizada correctamente";
      } else {
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function searchStat() {
    console.log("Searching stat...");

    var campos = new Map(
      Object.entries(newStat).filter((o) => {
        return o[1] != "";
      })
    );
    let querySymbol = "?";
    for (var [clave, valor] of campos.entries()) {
      querySymbol += clave + "=" + valor + "&";
    }
    fullQuery = querySymbol.slice(0, -1);

    if (fullQuery != "") {
      const res = await fetch(
        BASE_CONTACT_API_PATH + "/divorce-stats/" + fullQuery
      );
      if (res.ok) {
        console.log("OK");
        const json = await res.json();
        divorceStats = json;
      } else {
        divorceStats = [];
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";

        console.log("ERROR!" + errorMsg);
      }
    } else {
      errorMsg = "";
      okMsg = "Búsqueda realizada correctamente";
      getStats();
    }
  }

  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/divorce-stats?limit=" +
        limit +
        "&offset=" +
        offset
    );

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      divorceStats = json;
      console.log(`We have received ${divorceStats.length} stats.`);
      errorMsg = "";
    } else {
      if (natalityStats.length != 0) {
        okMsg = "";
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR! 404");
      }
      init = false;
    }
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
        okMsg = "Operación realizada correctamente";
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
          currentPage = 1;
        }
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
        getStats();
      } else {
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function insertStat() {
    console.log("Inserting stat: " + JSON.stringify(newStat));

    newStat.date = parseInt(newStat.date);
    newStat.born = parseInt(newStat.born);
    newStat["marriage-rate"] = parseInt(newStat["marriage-rate"]);
    newStat["divorce-rate"] = parseInt(newStat["divorce-rate"]);
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
        okMsg = "Operación realizada correctamente";
      } else {
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR!" + errorMsg);
        okMsg = "";
      }
    });
  }
  onMOunt(getStats);
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Volver</NavLink>
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
      {#each divorceStats as stat}
        <tr>
          <td
            ><input
              type="text"
              placeholder="spain"
              bind:value={newStat.country}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="2019"
              min="1900"
              bind:value={newStat.date}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="2000"
              min="1"
              bind:value={newStat["marriage-rate"]}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="1000"
              min="1"
              bind:value={newStat["divorce-rate"]}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="1000"
              min="1"
              bind:value={newStat["ratio-actual"]}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="10.2"
              min="1.0"
              bind:value={newStat["ratio-percent"]}
            /></td
          >
          <td
            ><Button color="secondary" on:click={insertStat}>Insertar</Button
            ></td
          >
          <td>
            <Button color="primary" on:click={searchStat}>Buscar</Button>
          </td>
        </tr>
      {/each}
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
