
export type Point = { x: number; y: number };

export function segment_intersect(
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
// r: radius of circle
// returns true if touching or crossing else false

export function circle_line_collision(C: Point, r: number, A: Point, B: Point) {
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
	return dist < r ** 2;
}