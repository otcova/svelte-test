<script lang="ts">
	import { fly, scale } from "svelte/transition";
	import type { Point } from "./geometry";

	export let pos: Point;
	export let parent: Point;
	export let small = false;

	// let angle = Math.atan2(pos.y - parent.y, pos.x - parent.x);
	let angle = Math.atan2(parent.y - pos.y, parent.x - pos.x);
	let dist = Math.sqrt((pos.y - parent.y) ** 2 + (pos.x - parent.x) ** 2);
	let offset = { x: pos.x - parent.x, y: pos.y - parent.y };
</script>

<div
	class="line"
	in:scale={{ duration: 1000, delay: 200 }}
	style="--h: 1px; --len: {dist}px; --x: {pos.x}px; --y: {pos.y}px; --a: {angle}rad"
/>
<div
	class="node"
	class:small
	in:fly={{ x: -offset.x, y: -offset.y, duration: 1000, delay: 0 }}
	style="--x: {pos.x}px; --y: {pos.y}px"
/>

<style lang="scss">
	.node {
		$diam: 30px;

		z-index: 1;
		position: absolute;
		border: 1px solid #ea2;
		// background-color: #ea2;
		background-color: #114;
		border-radius: 100%;
		width: calc($diam - 2px);
		height: calc($diam - 2px);
		left: calc(var(--x) - $diam / 2 + 1px);
		top: calc(var(--y) - $diam / 2 + 1px);
	}
	.small {
		width: 10px;
		height: 10px;
	}
	.line {
		$margin: 50px;

		position: absolute;
		// border: var(--h) solid #ea2;
		background-color: #ea2;
		background-color: #ea2;
		width: calc(var(--len) - $margin);
		height: var(--h);
		top: calc(var(--h) / -2);
		left: calc(($margin - var(--len)) / 2);
		translate: var(--x) var(--y);
		transform: rotate(var(--a)) translate(calc(var(--len) / 2), 0px);
	}
</style>
