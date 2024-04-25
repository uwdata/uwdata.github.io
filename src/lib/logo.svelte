<script lang="ts">
  import { onMount } from 'svelte';
	import { forceSimulation, forceManyBody, forceLink } from 'd3-force';
	import { base } from '$app/paths';
	const data = [
		[-7, 4, 0],
		[-7, 0, 0],
		[-7, -2, 0],
		[-7, -4, 0],
		[0, 0, 1],
		[-2, 0, 1],
		[-4, 0, 1],
		[0, 2, 1],
		[0, 4, 1],
		[0, -2, 1],
		[0, -4, 1],
		[-4, -2, 1],
		[-4, -4, 1],
		[-2, -4, 1],
		[3, 4, 2],
		[3, 2, 2],
		[3, 0, 2],
		[3, -2, 2],
		[3, -4, 2],
		[5, -4, 2]
	];
	const letter = ['i', 'd', 'l'];
	const faded = 0.15;
	const space = 25;
	const power = -100;
	const cell = 7;
	const pad = 1;
	const w = cell * 7 + space * 2;
	const h = cell * 5 + space * 2;
	const tx = Math.round(space + 3.5 * cell);
	const ty = Math.round(space + 2.0 * cell);
	const N = data.length;
	let svg: SVGSVGElement;

	onMount(() => {
		// initialize simulation nodes
		const pointer = { fx: 10000, fy: 10000 };
		const movable = data.map(d => ({
			x: Math.round(d[0] * 0.5 * cell),
			y: Math.round(d[1] * 0.5 * -cell)
		}));
		const anchors = movable.map(d => ({ fx: d.x, fy: d.y }));
		const nodes = [pointer, ...movable, ...anchors];

		// svg elements to position
		const rects = Array.from(svg.querySelectorAll('.active rect'));

		// make nodes repel from pointer node
		const chargeForce = forceManyBody()
			.distanceMin(10)
			.distanceMax(40)
			.strength((d, i) => i ? 0 : power);

		// link movable nodes to anchor nodes
		const links = Array.from(
			{ length: N },
			(_, i) => ({ source: i + 1, target: N + i + 1 })
		);
		const linkForce = forceLink(links).strength(0.3).distance(0);

    // instantiate force simulation and position updates
		const force = forceSimulation(nodes)
			.force('charge', chargeForce)
			.force('link', linkForce)
			.on('tick', () => {
				rects.forEach((rect, i) => {
					rect.setAttribute('x', `${Math.round(movable[i].x)}`);
					rect.setAttribute('y', `${Math.round(movable[i].y)}`);
				});
			});

		// set pointer node position and re-energize
		function updatePointer(x: number, y: number) {
			pointer.fx = x;
			pointer.fy = y;
			force.alpha(1).restart();
		}

    // respond to pointer movement
		svg.addEventListener('pointermove', event => {
			let point = svg.createSVGPoint();
			point.x = event.clientX;
			point.y = event.clientY;
			point = point.matrixTransform(svg.getScreenCTM()!.inverse());
			updatePointer(point.x - tx, point.y - ty);
		});

    // respond to pointer going away
		svg.addEventListener('pointerout', () => {
			updatePointer(10000, 10000);
		});
	});
</script>

<div>
<a href={`/${base}`}>
	<svg width={w} height={h} bind:this={svg}>
	  <g transform={`translate(${tx}, ${ty})`}>
		  <g fill-opacity={faded}>
		  {#each data as node}
				<rect
					class={`logo-${letter[node[2]]}`}
					x={Math.round(node[0] * 0.5 * cell)}
					y={Math.round(node[1] * 0.5 * -cell)}
					height={cell - pad}
					width={cell - pad}
				/>
			{/each}
			</g>
			<g class="active">
			{#each data as node}
				<rect
					class={`logo-${letter[node[2]]}`}
					x={Math.round(node[0] * 0.5 * cell)}
					y={Math.round(node[1] * 0.5 * -cell)}
					height={cell - pad}
					width={cell - pad}
				/>
			{/each}
			</g>
		</g>
	</svg>
</a>
</div>

<style>
div {
	height: 65px;
}
a {
	position: absolute;
	left: -5px;
  top: -9px;
  width: 99px;
  height: 85px;
  overflow: hidden;
}
</style>