<script lang="ts">
	import { onMount } from "svelte";
	import Edge from "./Edge.svelte";
	import { NetNode } from "./NetNode";
	import Node from "./Node.svelte";

	let nodes: NetNode[] = [];
	let active_node_index = 0;
	
	onMount(() => {
		nodes = [new NetNode({ x: innerWidth / 2, y: innerHeight / 2 })];
		setTimeout(tick, 100);
	});
	
	function tick() {
		const nodes_len = nodes.length;
		while (active_node_index < nodes_len) {
			nodes[active_node_index++].createChildren(nodes, 3);
		}
		if (nodes.length != nodes_len) nodes = nodes;
		setTimeout(tick, 300);
	}
	
	// let previ
	// addEventListener("resize", () => {
		
	// });
	
</script>

<div id="container">
	{#each nodes as node (node)}
		<Node pos={node.pos} parent={node.parent?.pos} fill={node.fill} />
		{#if node.parent}
			<Edge pos={node.pos} parent={node.parent.pos} />
		{/if}
	{/each}
</div>

<style>
	#container {
		position: relative;
		font-size: 30px;
		background-color: #114;
		height: 100vh;
		overflow: hidden;
	}
</style>
