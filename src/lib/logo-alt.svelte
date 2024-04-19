<script lang="ts">
	import * as d3 from 'd3';
	import { base } from '$app/paths';
	let data = [
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
	let letter = ['i', 'd', 'l'];
	let space = 25;
	let power = -200;
	let cell = 7;
	let pad = 1;
	let w = cell * 7 + space * 2;
	let h = cell * 5 + space * 2;
	let tx = Math.round(space + 1 * cell);
	let ty = Math.round(space + 2.0 * cell);
	let N = data.length;
	let nodes = data.slice();
	let ref: SVGGElement;

	function supportsSVG() {
		return (
			!!document.createElementNS &&
			!!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
		);
	}

	function logo() {
		// var g = ref.append('g').attr('transform', 'translate(' + tx + ',' + ty + ')');

		var lr = d3
			.select(ref)
			.selectAll('rect')
			.data(nodes)
			.enter()
			.append('rect')
			.attr('class', function (d) {
				return 'logo-' + letter[d[2]];
			})
			.attr('x', function (d) {
				// @ts-ignore
				return (d.x = Math.round((d[0] / 2) * cell));
			})
			.attr('y', function (d) {
				// @ts-ignore
				return (d.y = Math.round((d[1] / 2) * -cell));
			})
			.attr('width', cell - pad)
			.attr('height', cell - pad);

		// add force layout interaction
		// @ts-ignore
		function make(o) {
			return { x: o.x, y: o.y, fixed: true, radius: 0 };
		}
		// @ts-ignore
		nodes.push.apply(nodes, nodes.map(make));
		// @ts-ignore
		nodes.unshift(make({ x: 10000, y: 10000 }));

		var links = d3.range(N).map(function (i) {
			return { source: i + 1, target: i + N + 1 };
		});
		// @ts-ignore
		var force = d3.layout
			.force()
			.gravity(0)
			// @ts-ignore
			.charge(function (d, i) {
				return i ? 0 : power;
			})
			.linkDistance(0.1)
			.nodes(nodes)
			.links(links)
			.start()
			.on('tick', function () {
				// @ts-ignore
				for (var i = 0, q = d3.geom.quadtree(nodes); i < N; ++i) {
					q.visit(logo_collide(nodes[i + 1]));
				}
				lr.attr('x', function (d) {
					// @ts-ignore
					return Math.round(d.x);
				}).attr('y', function (d) {
					// @ts-ignore
					return Math.round(d.y);
				});
			});

		function move() {
			// @ts-ignore
			var p1 = d3.mouse(this);
			// @ts-ignore
			nodes[0].px = p1[0] - tx;
			// @ts-ignore
			nodes[0].py = p1[1] - ty;
			force.resume();
		}

		function off() {
			// @ts-ignore
			nodes[0].px = nodes[0].py = 10000;
			force.resume();
		}
		// @ts-ignore
		svg.on('mousemove', move).on('touchmove', move).on('mouseout', off).on('touchend', off);
	}

	// @ts-ignore
	function logo_collide(node) {
		var r = node.radius + 16,
			nx1 = node.x - r,
			nx2 = node.x + r,
			ny1 = node.y - r,
			ny2 = node.y + r;
		// @ts-ignore
		return function (quad, x1, y1, x2, y2) {
			if (quad.point && quad.point !== node) {
				var x = node.x - quad.point.x,
					y = node.y - quad.point.y,
					l = Math.sqrt(x * x + y * y),
					r = node.radius + quad.point.radius;
				if (l < r) {
					l = ((l - r) / l) * 0.5;
					node.x -= x *= l;
					node.y -= y *= l;
					quad.point.x += x;
					quad.point.y += y;
				}
			}
			return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		};
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a href={`/${base}`} class="relative">
	<img
		width={w}
		height={h}
		src={`${base}/images/logo/idl-logo.png`}
		alt="idl logo"
		class="absolute"
		class:opacity-10={supportsSVG()}
	/>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svg width={w} height={h}
		><g transform={`translate(${tx}, ${ty})`} bind:this={ref}>
			{#each data as node}
				<rect
					class={`logo-${letter[node[2]]}`}
					x={Math.round((node[0] / 2) * cell)}
					y={Math.round((node[1] / 2) * cell)}
					height={cell - pad}
					width={cell - pad}
				/>
			{/each}
		</g></svg
	>
</a>
