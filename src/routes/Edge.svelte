<script lang="ts">
	import { onMount } from "svelte";
	import type { Point } from "./geometry";

	export let pos: Point;
	export let parent: Point;

	let angle = Math.atan2(pos.y - parent.y, pos.x - parent.x);
	let dist = Math.sqrt((pos.y - parent.y) ** 2 + (pos.x - parent.x) ** 2);

	let show = false;
	onMount(() =>
		requestAnimationFrame(() => setTimeout(() => (show = true), 100))
	);
</script>

<div
	class="line"
	class:show
	style="--len: {dist}px; --x: {parent.x}px; --y: {parent.y}px; --a: {angle}rad"
/>

<style lang="scss">
	$line-width: 1px;
	$line-margin: 30px;

	.line {
		position: absolute;
		background-color: #ea2;
		background-color: #ea2;
		width: 0px;
		height: $line-width;
		top: calc($line-width / -2);
		translate: var(--x) var(--y);
		left: 0px;
		transform: rotate(var(--a));
		opacity: 0;
		transition: all ease-out 500ms;
	}
	.line.show {
		width: calc(var(--len) - $line-margin);
		left: calc(($line-margin - var(--len)) / 2);
		transform: rotate(var(--a)) translate(calc(var(--len) / 2), 0px);
		opacity: 1;
	}
</style>
