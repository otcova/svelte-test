<script lang="ts">
	import type { Point } from "./geometry";
	import { onMount } from "svelte";

	export let pos: Point;
	export let parent: Point | undefined;
	export let fill = false;

	let origin = parent ?? pos;

	let show = false;
	onMount(() => {
		requestAnimationFrame(() => requestAnimationFrame(() => (show = true)));
	});
</script>

<div
	class="node"
	class:fill
	class:show
	style="--x: {pos.x}px; --y: {pos.y}px; --x0: {origin.x}px; --y0: {origin.y}px"
/>

<style lang="scss">
	$diam: 16px;
	$inner_diam: 11px;
	$border-width: 1px;
	$in: ease-out 500ms;

	.node {
		position: absolute;
		z-index: 1;

		width: $diam;
		height: $diam;

		background-color: #114;
		border: $border-width solid #ea2;
		border-radius: 100%;

		transition: left $in, top $in, opacity $in;
		left: calc(var(--x0) - $diam / 2);
		top: calc(var(--y0) - $diam / 2);
		opacity: 0;
	}
	.node.show {
		left: calc(var(--x) - $diam / 2);
		top: calc(var(--y) - $diam / 2);
		opacity: 1;
	}

	.fill {
		cursor: pointer;
		width: $inner_diam;
		height: $inner_diam;
		background-color: #ea2;
		border: calc(($diam - $inner_diam) / 2) solid #114;
		transition: left $in, top $in, opacity $in, width 200ms, height 200ms,
			border-width 200ms;
	}
	.fill::after {
		content: "";
		position: absolute;
		border-radius: 100%;
		width: $diam;
		height: $diam;
		top: calc(($inner_diam - $diam) / 2 - $border-width);
		left: calc(($inner_diam - $diam) / 2 - $border-width);
		border: $border-width solid #ea2;
		transition: all 200ms,
	}
	.fill:hover {
		width: 0px;
		height: 0px;
		border-width: calc($diam / 2);
	}
	.fill:hover::after {
		border-radius: 8%;
		top: calc($diam / -2 - $border-width);
		left: calc($diam / -2 - $border-width);
	}
	.fill:active::after {
		background-color: #ea2;
	}
</style>
