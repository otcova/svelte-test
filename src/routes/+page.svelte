<script lang="ts">
	import { onMount } from "svelte";

	type Point = { x: number; y: number };
	type Circle = { x: number; y: number; r: number };
	let dots = [{ x: 0, y: 0 }];
	let small_dots: Point[] = [];
	let bars: { x: number; y: number; a: number; x0: number; y0: number }[] =
		[];

	onMount(() => spawnLoop());

	let start_millis = null;
	function spawnLoop() {
		const max_dots = 100;

		const millis = performance.now();
		start_millis ??= millis - 100;
		let required_dots = Math.min(
			max_dots,
			(millis - start_millis) / 100
		);

		for (let i = required_dots - dots.length; i > 0; --i) {
			spawnDot();
		}

		if (required_dots < max_dots) requestAnimationFrame(spawnLoop);
	}

	let spawn_root_index = 0;
	function spawnDot() {
		while (spawn_root_index < dots.length) {
			const i = spawn_root_index;
			REPOSITION: for (let tries = 0; tries < 1000; ++tries) {
				const a = Math.random() * 2 * Math.PI;
				const r = 200;
				const x = dots[i].x + Math.cos(a) * r;
				const y = dots[i].y + Math.sin(a) * r;

				// Test collisions
				let hitbox = 50;
				if (
					x < hitbox ||
					y < hitbox ||
					x > innerWidth - hitbox ||
					y > innerHeight - hitbox
				) {
					continue REPOSITION;
				}

				for (const dot of dots) {
					if ((dot.x - x) ** 2 + (dot.y - y) ** 2 < hitbox ** 2) {
						continue REPOSITION;
					}

					if (
						dot != dots[i] &&
						circle_line_collision(
							{ x: dot.x, y: dot.y, r: 2 * hitbox },
							{ x, y },
							dots[i]
						)
					) {
						continue REPOSITION;
					}
				}

				for (const bar of bars) {
					if (
						segment_intersect(
							{ x, y },
							{ x: dots[i].x, y: dots[i].y },
							{ x: bar.x, y: bar.y },
							{ x: bar.x0, y: bar.y0 }
						)
					) {
						continue REPOSITION;
					}

					if (
						circle_line_collision(
							{ x, y, r: 2 * hitbox },
							{ x: bar.x, y: bar.y },
							{ x: bar.x0, y: bar.y0 }
						)
					) {
						continue REPOSITION;
					}
				}

				// Add Dot
				dots = [...dots, { x, y }];
				bars = [
					...bars,
					{
						x,
						y,
						a: Math.atan2(dots[i].y - y, dots[i].x - x),
						x0: dots[i].x,
						y0: dots[i].y,
					},
				];
				return;
			}
			++spawn_root_index;
		}
	}

	function segment_intersect(
		a0: Point,
		b0: Point,
		a1: Point,
		b1: Point
	): false | Point {
		const s1_x = b0.x - a0.x,
			s1_y = b0.y - a0.y;
		const s2_x = b1.x - a1.x,
			s2_y = b1.y - a1.y;

		const s =
			(-s1_y * (a0.x - a1.x) + s1_x * (a0.y - a1.y)) /
			(-s2_x * s1_y + s1_x * s2_y);
		const t =
			(s2_x * (a0.y - a1.y) - s2_y * (a0.x - a1.x)) /
			(-s2_x * s1_y + s1_x * s2_y);

		const e = 0.001;
		if (e < s && s < 1 - e && e < t && t < 1 - e)
			return { x: a0.x + t * s1_x, y: a0.y + t * s1_y };

		return false;
	}

	// Function to check intercept of line seg and circle
	// A,B end points of line segment
	// C center of circle
	// radius of circle
	// returns true if touching or crossing else false
	function circle_line_collision(C: Circle, A: Point, B: Point) {
		var dist;
		const v1x = B.x - A.x;
		const v1y = B.y - A.y;
		const v2x = C.x - A.x;
		const v2y = C.y - A.y;
		// get the unit distance along the line of the closest point to
		// circle center
		const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);

		// if the point is on the line segment get the distance squared
		// from that point to the circle center
		if (u >= 0 && u <= 1) {
			dist = (A.x + v1x * u - C.x) ** 2 + (A.y + v1y * u - C.y) ** 2;
		} else {
			// if closest point not on the line segment
			// use the unit distance to determine which end is closest
			// and get dist square to circle
			dist =
				u < 0
					? (A.x - C.x) ** 2 + (A.y - C.y) ** 2
					: (B.x - C.x) ** 2 + (B.y - C.y) ** 2;
		}
		return dist < C.r * C.r;
	}
</script>

<div id="container">
	{#each dots as dot}
		<div class="dot" style={`left:${dot.x - 20}px;top:${dot.y - 20}px`} />
	{/each}
	{#each small_dots as dot}
		<div
			class="small_dot"
			style={`left:${dot.x - 10}px;top:${dot.y - 10}px`}
		/>
	{/each}
	{#each bars as bar}
		<div
			class="bar"
			style={`translate:${bar.x - 50}px ${bar.y}px;transform: rotate(${
				bar.a
			}rad) translate(100px,0)`}
		/>
	{/each}
</div>

<style>
	#container {
		font-size: 30px;
		background-color: #114;
		height: 100vh;
	}
	.dot,
	.small_dot {
		position: absolute;
		border-radius: 100%;
		width: 30px;
		height: 30px;
		border: 10px solid #ea2;
	}
	.small_dot {
		width: 10px;
		height: 10px;
		background-color: #ea2;
	}
	.bar {
		position: absolute;
		border: 5px solid #ea2;
		background-color: #ea2;
		width: 100px;
		height: 0px;
	}
</style>
