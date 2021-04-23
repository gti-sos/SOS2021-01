<script>
  import Table from "sveltestrap/src/Table.svelte";
  
  let contacts = [];

  async function getContacts() {
    console.log("Fetching contacts...");
    // espera a los datos de los contactos ylo mete en la variable
    const res = await fetch("/contacts");

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
  getContacts();
  console.log("After getContacts");
</script>

<main>
  <Table borderer>
    <thead>
      <tr>
        <th> Name </th>
        <th> Phone </th>
      </tr>
    </thead>
    <tbody>
        {#each contacts as contact}
            <tr>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
            </tr>
        {/each}
    </tbody>
  </Table>
</main>
