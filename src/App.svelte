<script>
	import MyTable from "./MyTable.svelte";
	export let name;
</script>

<main>
  <h1>Hello {name}!</h1>
  <!-- vista de escrtitura -->
  <input bind:value={name} />
  <p>This is my svelte APP</p>
  <!-- componentes con mayuscula -->
  <MyTable />
  <a href="info.html">View components</a>
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
