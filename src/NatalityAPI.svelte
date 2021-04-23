<script>
  import { Button, Container, Row, Table } from "sveltestrap";
  
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
  <h1>Natality Stats API</h1>
  <Container>
    <Row>
      <Button>Cargar datos inciales</Button>
      <Button>Borrar todos los datos</Button>
    </Row>
  </Container>
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
