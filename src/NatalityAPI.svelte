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
    Col,
    Container,
    Row,
    Table,
  } from "sveltestrap";

  let open1 = false;
  const toggle1 = () => (open1 = !open1);
  let open2 = false;
  const toggle2 = () => (open2 = !open2);
  let natalityStats = [];

  async function getStats() {
    console.log("Fetching data...");
    // espera a los datos de los contactos ylo mete en la variable
    const res = await fetch("api/v1/natality-stats/");

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      contacts = json;
      console.log(`We have received ${contacts.length} contacs.`);
    } else {
      console.log("Error");
    }
  }

  console.log("Before getContacts");
  //getContacts();
  console.log("After getContacts");
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
          <Button color="primary" on:click={toggle1}>Cargar</Button>
          <Button color="secondary" on:click={toggle1}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </NavItem>
    <NavItem>
      <NavLink href="#" on:click={toggle2}>Borrar todos los datos</NavLink>
      <Modal isOpen={open2} {toggle2}>
        <ModalHeader {toggle2}>¿Borrar todos los datos?</ModalHeader>
        <ModalBody>Esta acción no se puede deshacer.</ModalBody>
        <ModalFooter>
          <Button color="danger" on:click={toggle2}>Borrar</Button>
          <Button color="secondary" on:click={toggle2}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </NavItem>
  </Nav>
  <h2>Natality Stats</h2>
  
  <Table borderer>
    <thead>
      <tr>
        <th> Name </th>
        <th> Phone </th>
      </tr>
    </thead>
    <tbody />
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
