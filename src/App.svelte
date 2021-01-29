<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import FileList from './FileList.svelte'

	export let name: string;
	export let url = "";
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<Router>
		<!-- <nav>
		  <Link to="/">Home</Link>
		  <Link to="about">About</Link>
		  <Link to="blog">Blog</Link>
		</nav> -->
		<div>
		  <Route path="/*path" component="{FileList}" let:params/>
		</div>
	  </Router>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

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