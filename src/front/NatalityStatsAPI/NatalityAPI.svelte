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

  //------------------Nav-----------------------

  //Load stats
  let open1 = false;
  const toggle1 = () => (open1 = !open1);
  const toggle1P = () => {
    open1 = !open1;
    loadStats();
  };
  //Delete all stats
  let open2 = false;
  const toggle2 = () => (open2 = !open2);
  const toggle2P = () => {
    open2 = !open2;
    deleteAllStats();
  };

  //------------------API-------------------
  const BASE_CONTACT_API_PATH = "/api/v1";

  let natalityStats = [];

  let newStat = {
    country: "",
    date: "",
    born: "",
    "men-born": "",
    "women-born": "",
    "natality-rate": "",
    "fertility-rate": "",
  };

  //Alertas
  let errorMsg = "";
  let okMsg = "";

  let fullQuery = "";

  //Pagination
  let current_offset = 0;
  let limit = 10;

  let current_page = 1;
  let last_page = 1;
  let total = 0;

  //Functions

  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/loadInitialData"
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
        BASE_CONTACT_API_PATH + "/natality-stats/" + fullQuery
      );
      if (res.ok) {
        console.log("OK");
        const json = await res.json();
        natalityStats = json;
      } else {
        natalityStats = [];
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

  async function getNumTotal() {
    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats");
    if (res.ok) {
      const json = await res.json();
      total=json.length;
      console.log("getTOAL: "+total);
      changePage(current_page, current_offset);
    } else {
      errorMsg = "No se han encontrado datos.";
    }
  }

  function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  function changePage(page, offset) {
    console.log("------Change page------");
    console.log("Params page: "+page+" offset: "+offset);
    last_page=Math.ceil(total/10);
    console.log("new last page: "+last_page);
    if (page !== current_page) {
      console.log("enter if");
      current_offset = offset;
      current_page = page;
      console.log("page: "+page);
      console.log("current_offset: "+current_offset);
      console.log("current_page: "+current_page);
      getStats();
    }
    console.log("---------Exit change page-------");
  }

  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/natality-stats?limit=" +
        limit +
        "&offset=" +
        current_offset
    );

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      natalityStats = json;
      console.log(`We have received ${natalityStats.length} stats.`);
      errorMsg = "";
     
    } else {
      if (natalityStats.length != 0) {
        okMsg = "";
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR! 404");
      }
    }
  }

  async function deleteAllStats() {
    console.log("Deleting data...");

    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats/", {
      method: "DELETE",
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        natalityStats = [];
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
      BASE_CONTACT_API_PATH + "/natality-stats/" + country + "/" + date,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        if (natalityStats.length === 1) {
          natalityStats = [];
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
    newStat["men-born"] = parseInt(newStat["men-born"]);
    newStat["women-born"] = parseInt(newStat["women-born"]);
    newStat["natality-rate"] = parseFloat(newStat["natality-rate"]);
    newStat["fertility-rate"] = parseFloat(newStat["fertility-rate"]);

    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats/", {
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

  onMount(getStats);
  getNumTotal();
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
      {#if natalityStats.length === 0}
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
  <h2>Natalidad</h2>

  <p />

  <p />
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
        <th>Nacimientos </th>
        <th>Hombres nacidos </th>
        <th>Mujeres nacidas </th>
        <th>Tasa de natalidad </th>
        <th>Índice de fecundación </th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
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
            bind:value={newStat.born}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="1000"
            min="1"
            bind:value={newStat["men-born"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="1000"
            min="1"
            bind:value={newStat["women-born"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="10.2"
            min="1.0"
            bind:value={newStat["natality-rate"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="2.1"
            min="1.0"
            bind:value={newStat["fertility-rate"]}
          /></td
        >
        <td
          ><Button color="secondary" on:click={insertStat}>Insertar</Button></td
        >
        <td>
          <Button color="primary" on:click={searchStat}>Buscar</Button>
        </td>
      </tr>

      {#each natalityStats as stat}
        <tr>
          <td>{stat.country}</td>
          <td>{stat.date}</td>
          <td>{stat.born}</td>
          <td>{stat["men-born"]}</td>
          <td>{stat["women-born"]}</td>
          <td>{stat["natality-rate"]}%</td>
          <td>{stat["fertility-rate"]}</td>
          <td>
            <a href="#/natality-stats/{stat.country}/{stat.date}">
              <Button color="primary">Editar</Button>
            </a></td
          >
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

  <!-- Pagination -->
  <Pagination ariaLabel="Web pagination">
    <PaginationItem class={current_page === 1 ? "disabled" : ""}>
      <PaginationLink
        previous
        href="#/natality-stats"
        on:click={() => changePage(current_page - 1, current_offset-10)}
      />
    </PaginationItem>
    {#each range(last_page, 1) as page}
      <PaginationItem class={current_page === page ? "active" : ""}>
        <PaginationLink
          previous
          href="#/natality-stats"
          on:click={() => changePage(page, (page-1)*10)}>{page}</PaginationLink>
      </PaginationItem>
    {/each}
    <PaginationItem class={current_page === last_page ? "disabled" : ""}>
      <PaginationLink
        next
        href="#/natality-stats"
        on:click={() => changePage(current_page + 1,current_offset+10)}
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
