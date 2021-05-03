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
  let resultQuery = [];

  let newStat = {
    country: "",
    date: "",
    born: "",
    "men-born": "",
    "women-born": "",
    "natality-rate": "",
    "fertility-rate": "",
  };

  let queryStat = {
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

  let isASearch = false;
  // Functiones de ayuda
  function resetInputs(flag) {
    console.log("Reseting inputs: " + flag);
    let resetStat = {
      country: "",
      date: "",
      born: "",
      "men-born": "",
      "women-born": "",
      "natality-rate": "",
      "fertility-rate": "",
    };
    if (flag == 1) {
      queryStat = resetStat;
      current_page = 1;
      current_offset = 0;
    } else {
      newStat = resetStat;
    }
  }

  //Calcula el rango entre ods valores
  function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  //Cambio de pagina
  function changePage(page, offset, search) {
    console.log("------Change page------");
    console.log(
      "Params page: " + page + " offset: " + offset + " search: " + search
    );
    last_page = Math.ceil(total / 10);
    console.log("new last page: " + last_page);
    if (page !== current_page) {
      console.log("enter if");
      current_offset = offset;
      current_page = page;
      console.log("page: " + page);
      console.log("current_offset: " + current_offset);
      console.log("current_page: " + current_page);
      if (search == false) {
        console.log(" search: false?" + search);
        getStats();
      } else {
        console.log(" search: true?" + search);
        searchStat();
      }
    }
    console.log("---------Exit change page-------");
  }

  //Total de datos en la BD
  async function getNumTotal() {
    console.log("Total entities of getStat");
    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats");
    if (res.ok) {
      const json = await res.json();
      total = json.length;
      console.log("getTotal: " + total);
      changePage(current_page, current_offset, isASearch);
    } else {
      errorMsg = "No se ha encontrado datos.";
    }
  }

  //Total de datos de una query en la BD
  async function getNumTotalQuery() {
    console.log("Total entities of query");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats" + fullQuery
    );
    if (res.ok) {
      const json = await res.json();
      total = json.length;
      console.log("getTotal: " + total);
      changePage(current_page, current_offset, isASearch);
    } else {
      errorMsg = "No se ha encontrado datos.";
    }
  }

  function restore() {
    if (isASearch == true) {
      resetInputs(1);
      isASearch = false;
    }
    current_offset=0;
    current_page=1;
    getNumTotal();
  }

  //Funciones API
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStats();
        //Alertas
        errorMsg = "";
        errorStatus = 0;
        okMsg = "Datos cargados correctamente";
      } else {
        if (res.status === 409) {
          errorMsg = "Alguno de los datos ya se encuentra cargado";
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
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

      getNumTotal();
    } else {
      if (natalityStats.length != 0) {
        errorMsg = "No hay datos disponibles";
        console.log("ERROR!");
      }
      if (res.status === 500) {
        errorMsg = "No se ha podido acceder a la base de datos";
      }
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }

  async function searchStat() {
    console.log("Searching stat...");
    var msg = "";

    if(isASearch==false){
      current_offset=0;
      current_page=1;
    }

    var campos = new Map(
      Object.entries(queryStat).filter((o) => {
        return o[1] != "";
      })
    );
    let querySymbol = "?";
    for (var [clave, valor] of campos.entries()) {
      msg += clave + "=" + valor + " ";
      querySymbol += clave + "=" + valor + "&";
    }
    fullQuery = querySymbol.slice(0, -1);

    if (fullQuery != "") {
      const res = await fetch(
        BASE_CONTACT_API_PATH +
          "/natality-stats/" +
          fullQuery +
          "&limit=" +
          limit +
          "&offset=" +
          current_offset
      );
      if (res.ok) {
        console.log("OK");
        const json = await res.json();
        resultQuery = json;
        okMsg = "Resulado de la busqueda con " + msg;
        isASearch = true;
        getNumTotalQuery();
      } else {
        resultQuery = [];
        if (res.status === 404) {
          errorMsg = "No existe un dato con " + msg;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    } else {
      errorMsg = "Se necesita un campo a buscar";
      okMsg = "";
    }
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
        restore();
        getStats();
        errorMsg = "";
        okMsg = `${newStat.country} ${newStat.date} ha sido insertado correctamente`;
      } else {
        if (res.status === 409) {
          errorMsg = `${newStat.country} ${newStat.date} ya se encuentra cargado`;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
    resetInputs(2);
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
        okMsg = `La entrada ${country} ${date} ha sido borrada`;
        getStats();
      } else {
        if (res.status === 404) {
          errorMsg = `No se puede eliminar, la entrada ${country} ${date} no existe`;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
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
        okMsg = "Todos los elementos han sido borrados";
        restore();
        //getStats();
      } else {
        if (res.status === 404) {
          errorMsg = "No existen datos que borrar";
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  //functions executed
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

  <h3>Buscar</h3>
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
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          ><input
            type="text"
            placeholder="spain"
            bind:value={queryStat.country}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="2019"
            min="1900"
            bind:value={queryStat.date}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="2000"
            min="1"
            bind:value={queryStat.born}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="1000"
            min="1"
            bind:value={queryStat["men-born"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="1000"
            min="1"
            bind:value={queryStat["women-born"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="10.2"
            min="1.0"
            bind:value={queryStat["natality-rate"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder="2.1"
            min="1.0"
            bind:value={queryStat["fertility-rate"]}
          /></td
        >
        <td><Button color="primary" on:click={searchStat}>Buscar</Button></td>
        <td><Button color="secondary" on:click={restore}>Restaurar</Button></td
        >
      </tr>
    </tbody>
  </Table>

  <h3>Listado de datos</h3>
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
        <td><Button color="primary" on:click={insertStat}>Insertar</Button></td>
      </tr>

      {#if isASearch==true}
        {#each resultQuery as stat}
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
      {:else}
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
      {/if}
    </tbody>
  </Table>

  <!-- Pagination -->
  <Pagination ariaLabel="Web pagination">
    <PaginationItem class={current_page === 1 ? "disabled" : ""}>
      <PaginationLink
        previous
        href="#/natality-stats"
        on:click={() =>
          changePage(current_page - 1, current_offset - 10, isASearch)}
      />
    </PaginationItem>
    {#each range(last_page, 1) as page}
      <PaginationItem class={current_page === page ? "active" : ""}>
        <PaginationLink
          previous
          href="#/natality-stats"
          on:click={() => changePage(page, (page - 1) * 10, isASearch)}
          >{page}</PaginationLink
        >
      </PaginationItem>
    {/each}
    <PaginationItem class={current_page === last_page ? "disabled" : ""}>
      <PaginationLink
        next
        href="#/natality-stats"
        on:click={() =>
          changePage(current_page + 1, current_offset + 10, isASearch)}
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
