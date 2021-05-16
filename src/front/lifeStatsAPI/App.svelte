<script>
	import LifeStatsTable from './LifeStatsTable.svelte';	
    import{Nav, NavItem, NavLink } from "sveltestrap";
</script>


<main>
	<div class="nav">
		<Nav>
			<NavItem>
			<NavLink href="/">Página Principal</NavLink>
			</NavItem>
			<NavItem>
			<NavLink href="#/life-stats/lifeCharts">Analíticas</NavLink>
			</NavItem>
		</Nav>
	</div>

	<h1 class="display-3" style="text-align: center;" >API de calidad de vida</h1>
	<div>
		<LifeStatsTable/>
	</div>
</main>

<style>
	div {
		margin-left:50px ;
		margin-right: 50px;
	}
	div.nav {
		margin-top:50px;
	}
</style>