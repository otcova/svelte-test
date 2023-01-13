import { circleLineCollision, segmentIntersect, type Point } from "./geometry";

export class NetNode {

	pos: Point;
	parent?: NetNode;
	children: NetNode[] = [];
	fill: boolean = false;
	onResize?: () => void;
	spawnTries = 0;

	constructor(parent: NetNode | Point, offset_angle?: number) {
		if (parent instanceof NetNode) {
			this.parent = parent;
			const r = 110 - Math.random() * 60;
			const a = modAngle(offset_angle ?? Math.random() * Math.PI * 2);
			this.pos = {
				x: parent.pos.x + r * Math.cos(a),
				y: parent.pos.y + r * Math.sin(a)
			};
		} else {
			this.pos = parent;
		}
		// this.fill = Math.random() < 0.1;
	}

	collideWithNode(node: NetNode): boolean {
		const node_r = 30;

		// New Node - Other Edge collision
		if (node.parent && circleLineCollision(
			this.pos,
			node_r,
			node.pos,
			node.parent.pos
		)) return true;

		if (node == this.parent) return false;

		// New Node - Other Node collision
		if ((node.pos.x - this.pos.x) ** 2 + (node.pos.y - this.pos.y) ** 2 < node_r ** 2) {
			return true;
		}

		// New Edge - Other Node collision
		if (this.parent && circleLineCollision(
			node.pos,
			node_r,
			this.pos,
			this.parent.pos
		)) return true;

		// New Edge - Other Edge collision
		if (node.parent && this.parent && segmentIntersect(
			this.pos,
			this.parent.pos,
			node.pos,
			node.parent.pos
		)) return true;



		return false;
	}

	collideWithScreen(): boolean {
		const screen_margin = -20;
		if (this.pos.x < screen_margin ||
			this.pos.y < screen_margin ||
			this.pos.x > innerWidth - screen_margin ||
			this.pos.y > innerHeight - screen_margin
		) {
			// if (!this.onResize) {
			// 	this.onResize = () => {
			// 		// if (!this.valid_position()) // Delete
			// 	};
			// 	// addEventListener("resize", this.onResize);
			// }
			return true;
		}
		return false;
	}

	validPosition(nodes: NetNode[]): boolean {
		if (this.collideWithScreen()) return false;
		for (const node of nodes) {
			if (this.collideWithNode(node)) return false;
		}
		return true;
	}

	createChildren(nodes: NetNode[], tries: number) {
		while (tries-- > 0) {
			const node = new NetNode(this);
			if (node.validPosition(nodes)) {
				nodes.push(node);
				this.children.push(node);
			}
		}

		if (this.children.length == 0) {
			const node = new NetNode(this, Math.random() * Math.PI / 2);
			if (node.validPosition(nodes)) {
				nodes.push(node);
				this.children.push(node);
			}
		}
		if (this.children.length == 3)
		this.fill = Math.random() < 0.9;
		if (this.children.length > 0 && this.fill) 
		this.children[Math.floor(Math.random() * this.children.length)].fill = true;
	}
}

function modAngle(a: number): number {
	const PI2 = Math.PI * 2;
	a = ((a % PI2) + PI2) % PI2;
	const m = 8;
	return PI2 * Math.round(m * a / PI2) / m;
}