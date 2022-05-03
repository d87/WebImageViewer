<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import FileList from './FileList.svelte'

    export let name: string;
    export let url = "";
</script>

<main>
    <!-- <h1>Hello {name}!</h1> -->
    <Router url={url}>
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
        /* margin: 0 auto; */
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
