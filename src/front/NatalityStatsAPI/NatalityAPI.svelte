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
  const BASE_CONTACT_API_PATH = "/api/v2";

  //GetStats local db
  let natalityStats = [];

  //Local inputs
  var insertStatInput = {
    country: "",
    date: "",
    born: "",
    "men-born": "",
    "women-born": "",
    "natality-rate": "",
    "fertility-rate": "",
  };
  var queryStatInput = {
    country: "",
    date: "",
    born: "",
    "men-born": "",
    "women-born": "",
    "natality-rate": "",
    "fertility-rate": "",
  };

  //flags
  let isASearch = false;

  //Alertas GUI
  let errorMsg = "";
  let okMsg = "";
  let warningMsg = "";

  //Pagination GUI
  let current_offset = 0;
  let limit = 10;

  let current_page = 1;
  let last_page = 1;
  let total = 0;

  //------------------------------------------- Funciones de ayuda -------------------------------------------

  //-------Paginacion-------

  /**
   * Calcula la posicion de la pagina actual
   * @param size
   * @param startAt
   */
  function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  /**
   * Controla el cambio de pagina segun si es busqueda o no
   * @param page pagina
   * @param offset desplazamiento
   * @param search flag de busqueda
   */
  function changePage(page, offset, search) {
    last_page = Math.ceil(total / 10);
    if (page !== current_page) {
      current_offset = offset;
      current_page = page;
      if (search == false) {
        getStats();
      } else {
        searchStat();
      }
    }
  }

  /**
   * Obtiene el total de elementos de una consulta
   * @param fullQuery
   */
  async function getNumTotal(fullQuery = "") {
    console.log("Fetching total entries");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats" + fullQuery
    );
    if (res.ok) {
      const json = await res.json();
      total = json.length;
      changePage(current_page, current_offset, isASearch);
    } else {
      total = 0;
      changePage(1, 0, false);
      console.log("ERROR!");
    }
  }

  //-------Inputs-------

  /**
   * Permite reiniciar los inputs
   * @param flag si es busqueda o insercion
   */
  function resetInputs(flag) {
    switch (flag) {
      case "search":
        queryStatInput = {
          country: "",
          date: "",
          born: "",
          "men-born": "",
          "women-born": "",
          "natality-rate": "",
          "fertility-rate": "",
        };
        current_page = 1;
        current_offset = 0;
        getStats();
        break;
      case "insert":
        insertStatInput = {
          country: "",
          date: "",
          born: "",
          "men-born": "",
          "women-born": "",
          "natality-rate": "",
          "fertility-rate": "",
        };
        break;
    }
  }

  //-------GUI dinamica-------
  function getInputNameSpanish(inputName) {
    switch (inputName) {
      case "country":
        return "País";
      case "date":
        return "Año";
      case "born":
        return "Nacimientos";
      case "men-born":
        return "Hombres nacidos";
      case "women-born":
        return "Mujeres nacidas";
      case "natality-rate":
        return "Tasa de natalidad";
      case "fertility-rate":
        return "Índice de fecundación";
    }
  }

  //------------------------------------------- Funciones API -------------------------------------------

  /**
   * LoadInitialData
   */
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        getStats();

        errorMsg = "";
        okMsg = "Datos cargados correctamente";
        console.log("OK");
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

  /**
   * Obtiene los datos de nuestra API
   */
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
      const json = await res.json();
      natalityStats = json;

      console.log(`We have received ${natalityStats.length} stats.`);

      isASearch = false;

      warningMsg = "";

      getNumTotal();

      console.log("Ok");
    } else {
      if (natalityStats.length == 0) {
        warningMsg = "No hay datos disponibles";
      }
      if (res.status === 500) {
        errorMsg = "No se ha podido acceder a la base de datos";
      }
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }

  /**
   * Obtiene la consulta de una busqueda de elementos sobre la API
   */
  async function searchStat() {
    console.log("Searching stat...");

    var msg = "";
    let fullQuery = "";
    let querySymbol = "?";

    if (isASearch == false) {
      current_offset = 0;
      current_page = 1;
    }

    //Input data
    var inputData = new Map(
      Object.entries(queryStatInput).filter((o) => {
        return o[1] != "";
      })
    );
    console.log(inputData);

    //Building query
    for (var [inputName, inputValue] of inputData.entries()) {
      if (inputValue !== null) {
        msg += getInputNameSpanish(inputName) + "=" + inputValue + " ";
        querySymbol += inputName + "=" + inputValue + "&";
      }
    }
    fullQuery = querySymbol.slice(0, -1);
    console.log("with query: " + fullQuery);

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
        natalityStats = json;

        okMsg = "Resulado de la busqueda con " + msg;
        isASearch = true;
        errorMsg = "";

        getNumTotal(fullQuery);
      } else {
        natalityStats = [];
        if (res.status === 404) {
          errorMsg = "No existe un dato con " + msg;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        resetInputs("search");
        console.log("ERROR!" + errorMsg);
      }
    } else {
      //Busqueda vacia
      getStats();
    }
  }

  /**
   * Se encarga de insertar recursos en la API
   */
  async function insertStat() {
    console.log("Inserting stat: " + JSON.stringify(insertStatInput));

    insertStatInput.date = parseInt(insertStatInput.date);
    insertStatInput.born = parseInt(insertStatInput.born);
    insertStatInput["men-born"] = parseInt(insertStatInput["men-born"]);
    insertStatInput["women-born"] = parseInt(insertStatInput["women-born"]);
    insertStatInput["natality-rate"] = parseFloat(
      insertStatInput["natality-rate"]
    );
    insertStatInput["fertility-rate"] = parseFloat(
      insertStatInput["fertility-rate"]
    );

    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats/", {
      method: "POST",
      body: JSON.stringify(insertStatInput),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");

        errorMsg = "";
        okMsg = `La entrada ${insertStatInput.country} ${insertStatInput.date} ha sido insertado correctamente`;

        resetInputs("insert");
        if (isASearch) {
          searchStat();
        } else {
          getStats();
        }
      } else {
        if (res.status === 409) {
          errorMsg = `${insertStatInput.country} ${insertStatInput.date} ya se encuentra cargado`;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        } else {
          errorMsg = "Todos los campos deben estar rellenados correctamene";
        }
        okMsg = "";

        resetInputs("insert");
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  /**
   * Se encarga de borrar recursos por pais y año
   * @param country pais
   * @param date año
   */
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

        //Un elemento en la pagina
        if (natalityStats.length === 1) {
          natalityStats = [];
          current_page = current_page - 1;
          current_offset = current_offset - 10;
        }
        if (isASearch) {
          searchStat();
        } else {
          getStats();
        }

        errorMsg = "";
        okMsg = `La entrada ${country} ${date} ha sido borrada correctamente`;
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

  /**
   * Borra todos los recursos de la API
   */
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
        getNumTotal();
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

  onMount(getStats);
  getNumTotal();
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink id="nav_home" href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_interface" href="/#/natality-stats"
        >Interfaz</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_nat_analytics" href="/#/natality-stats/natalityChart"
        >Analíticas todos los campos</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_nat_analytics2" href="/#/natality-stats/natalityChart2"
        >Analíticas hombres y mujeres nacidos</NavLink
      >
    </NavItem>
  </Nav>

  <h2>Natalidad</h2>

  <div>
    {#if errorMsg}
      <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
    {#if warningMsg}
      <p class="msgYellow" style="color: #a56604">{warningMsg}</p>
    {/if}
  </div>
  <div>
    <Button id="b_load_toggle" color="primary" on:click={toggle1}
      >Cargar datos inciales</Button
    >
    <Modal isOpen={open1} {toggle1}>
      <ModalHeader {toggle1}>¿Cargar los datos iniciales?</ModalHeader>
      <ModalBody>
        Esta acción borrará todos los datos existentes y cargará los datos
        iniciales.
      </ModalBody>
      <ModalFooter>
        <Button id="b_load_toggle_ok" color="primary" on:click={toggle1P}
          >Cargar</Button
        >
        <Button id="b_load_toggle_cancel" color="secondary" on:click={toggle1}
          >Cancelar</Button
        >
      </ModalFooter>
    </Modal>

    {#if natalityStats.length === 0}
      <Button disabled color="danger" on:click={toggle2}
        >Borrar todos los datos</Button
      >
    {:else}
      <Button id="b_delete_toggle" color="danger" on:click={toggle2}
        >Borrar todos los datos</Button
      >
      <Modal isOpen={open2} {toggle2}>
        <ModalHeader {toggle2}>¿Borrar todos los datos?</ModalHeader>
        <ModalBody>Esta acción no se puede deshacer.</ModalBody>
        <ModalFooter>
          <Button id="b_delete_toggle_ok" color="danger" on:click={toggle2P}
            >Borrar</Button
          >
          <Button
            id="b_delete_toggle_cancel"
            color="secondary"
            on:click={toggle2}>Cancelar</Button
          >
        </ModalFooter>
      </Modal>
    {/if}
  </div>

  <div>
    <h3>Listado de datos</h3>
    <Table bordered>
      <thead>
        <tr>
          <th> País </th>
          <th>Año </th>
          <th>Nacimientos </th>
          <th>Hombres nacidos </th>
          <th>Mujeres nacidas </th>
          <th>Tasa de natalidad </th>
          <th>Índice de fecundación </th>
          <th colspan="2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            ><input
              id="query_input_country"
              type="text"
              placeholder="spain"
              bind:value={queryStatInput.country}
            /></td
          >
          <td
            ><input
              id="query_input_date"
              type="number"
              placeholder="2019"
              min="1900"
              bind:value={queryStatInput.date}
            /></td
          >
          <td
            ><input
              id="query_input_born"
              type="number"
              placeholder="2000"
              min="1"
              bind:value={queryStatInput.born}
            /></td
          >
          <td
            ><input
              id="query_input_men_born"
              type="number"
              placeholder="1000"
              min="1"
              bind:value={queryStatInput["men-born"]}
            /></td
          >
          <td
            ><input
              id="query_input_women_born"
              type="number"
              placeholder="1000"
              min="1"
              bind:value={queryStatInput["women-born"]}
            /></td
          >
          <td
            ><input
              id="query_input_natality_rate"
              type="number"
              placeholder="10.2"
              min="1.0"
              bind:value={queryStatInput["natality-rate"]}
            /></td
          >
          <td
            ><input
              id="query_input_fertility_rate"
              type="number"
              placeholder="2.1"
              min="1.0"
              bind:value={queryStatInput["fertility-rate"]}
            /></td
          >

          <td colspan="2"
            ><Button id="query_button" color="primary" on:click={searchStat}
              >Buscar</Button
            ></td
          >
        </tr>
        <tr>
          <td colspan="9" />
        </tr>
        <tr>
          <td
            ><input
              id="insert_input_country"
              type="text"
              placeholder="spain"
              bind:value={insertStatInput.country}
            /></td
          >
          <td
            ><input
              id="insert_input_date"
              type="number"
              placeholder="2019"
              min="1900"
              bind:value={insertStatInput.date}
            /></td
          >
          <td
            ><input
              id="insert_input_born"
              type="number"
              placeholder="2000"
              min="1"
              bind:value={insertStatInput.born}
            /></td
          >
          <td
            ><input
              id="insert_input_men_born"
              type="number"
              placeholder="1000"
              min="1"
              bind:value={insertStatInput["men-born"]}
            /></td
          >
          <td
            ><input
              id="insert_input_women_born"
              type="number"
              placeholder="1000"
              min="1"
              bind:value={insertStatInput["women-born"]}
            /></td
          >
          <td
            ><input
              id="insert_input_natality_rate"
              type="number"
              placeholder="1"
              min="1.0"
              bind:value={insertStatInput["natality-rate"]}
            /></td
          >
          <td
            ><input
              id="insert_input_fertility_rate"
              type="number"
              placeholder="1"
              min="1.0"
              bind:value={insertStatInput["fertility-rate"]}
            /></td
          >
          <td colspan="2"
            ><Button id="insert_button" color="primary" on:click={insertStat}
              >Insertar</Button
            ></td
          >
        </tr>

        <tr>
          <td colspan="9" />
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
                <Button
                  id="edit_button_{stat.country}_{stat.date}"
                  color="primary">Editar</Button
                >
              </a></td
            >
            <td
              ><Button
                id="delete_button_{stat.country}_{stat.date}"
                color="danger"
                on:click={deleteStat(stat.country, stat.date)}>Borrar</Button
              ></td
            >
          </tr>
        {/each}
      </tbody>
    </Table>
  </div>

  <div>
    <p>Se muestran {natalityStats.length} de un total de {total} entradas.</p>

    <!-- Pagination -->
    <Pagination ariaLabel="Web pagination">
      <PaginationItem class={current_page === 1 ? "disabled" : ""}>
        <PaginationLink
          previous
          id="pagination_back"
          href="#/natality-stats"
          on:click={() =>
            changePage(current_page - 1, current_offset - 10, isASearch)}
        />
      </PaginationItem>
      {#each range(last_page, 1) as page}
        <PaginationItem class={current_page === page ? "active" : ""}>
          <PaginationLink
            previous
            id="pagination_current"
            href="#/natality-stats"
            on:click={() => changePage(page, (page - 1) * 10, isASearch)}
            >{page}</PaginationLink
          >
        </PaginationItem>
      {/each}
      <PaginationItem class={current_page === last_page ? "disabled" : ""}>
        <PaginationLink
          next
          id="pagination_forward"
          href="#/natality-stats"
          on:click={() =>
            changePage(current_page + 1, current_offset + 10, isASearch)}
        />
      </PaginationItem>
    </Pagination>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  p {
    display: inline;
  }
  .msgYellow {
    padding: 8px;

    background-color: #fff3cd;
  }
  .msgRed {
    padding: 8px;

    background-color: #f8d7da;
  }
  .msgGreen {
    padding: 8px;

    background-color: #d4edda;
  }
  div {
    margin-bottom: 20px;
  }
  h2 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
