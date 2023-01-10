<script lang="ts">
	import { onMount } from "svelte";
	import {
		circle_line_collision,
		segment_intersect,
		type Point,
	} from "./geometry";
	import Node from "./Node.svelte";

	const node_r = 60;
	let nodes: { pos: Point; parent: Point; small?: boolean }[] = [
		{ pos: { x: node_r, y: node_r }, parent: { x: node_r, y: node_r } },
	];

	onMount(() => spawnLoop());

	let start_millis = null;
	function spawnLoop() {
		const max_dots = 100;

		const millis = performance.now();
		start_millis ??= millis - 100;
		let required_dots = Math.min(max_dots, (millis - start_millis) / 30);

		for (let i = required_dots - nodes.length; i > 0; --i) {
			spawnNode();
		}

		if (required_dots < max_dots) requestAnimationFrame(spawnLoop);
	}

	let spawn_root_index = 0;
	function spawnNode() {
		while (spawn_root_index < nodes.length) {
			const parent = nodes[spawn_root_index];

			REPOSITION: for (let tries = 0; tries < 10; ++tries) {
				const a = Math.random() * 2 * Math.PI;
				const r = 200 - Math.random() * 100;
				const x = parent.pos.x + Math.cos(a) * r;
				const y = parent.pos.y + Math.sin(a) * r;

				// Node - Screen collision
				if (
					x < node_r ||
					y < node_r ||
					x > innerWidth - node_r ||
					y > innerHeight - node_r
				) {
					continue REPOSITION;
				}

				for (const node of nodes) {
					// New Node - Other Node collision
					if (
						(node.pos.x - x) ** 2 + (node.pos.y - y) ** 2 <
						node_r ** 2
					) {
						continue REPOSITION;
					}

					// New Node - Other Edge collision
					if (
						circle_line_collision(
							{ x, y },
							node_r,
							node.pos,
							node.parent
						)
					) {
						continue REPOSITION;
					}

					// New Edge - Other Edge collision
					if (
						segment_intersect(
							{ x, y },
							parent.pos,
							node.pos,
							node.parent
						)
					) {
						continue REPOSITION;
					}

					// New Edge - Other Node collision
					if (
						node != parent &&
						circle_line_collision(
							node.pos,
							node_r,
							{ x, y },
							parent.pos
						)
					) {
						continue REPOSITION;
					}
				}

				// Add Node
				nodes = [...nodes, { pos: { x, y }, parent: parent.pos }];
				return;
			}
			++spawn_root_index;
		}
	}
</script>

<div id="container">
	{#each nodes as node} <Node {...node} /> {/each}
</div>

<style>
	#container {
		position: relative;
		font-size: 30px;
		background-color: #114;
		height: 100vh;
	}
</style>
