<script lang="ts">
	import { base } from '$app/paths';
	// import { forceSimulation, forceLink } from 'd3-force';
	// let data = [
	// 	[-7, 4, 0],
	// 	[-7, 0, 0],
	// 	[-7, -2, 0],
	// 	[-7, -4, 0],
	// 	[0, 0, 1],
	// 	[-2, 0, 1],
	// 	[-4, 0, 1],
	// 	[0, 2, 1],
	// 	[0, 4, 1],
	// 	[0, -2, 1],
	// 	[0, -4, 1],
	// 	[-4, -2, 1],
	// 	[-4, -4, 1],
	// 	[-2, -4, 1],
	// 	[3, 4, 2],
	// 	[3, 2, 2],
	// 	[3, 0, 2],
	// 	[3, -2, 2],
	// 	[3, -4, 2],
	// 	[5, -4, 2]
	// ];
	// const letter = ['i', 'd', 'l'];
	// const space = 25;
	// const power = -200;
	// const cell = 7;
	// const pad = 1;
	// const width = cell * 7 + space * 2;
	// const height = cell * 5 + space * 2;
	// const tx = Math.round(space + 3.5 * cell);
	// const ty = Math.round(space + 2.0 * cell);
	// const N = data.length;
	// const nodes = data.slice();

	// var links = [...new Array(N)].map((_, i) => ({ source: i + 1, target: i + N + 1 }));

	// var force = forceSimulation(data)
	// 	.force('link', forceLink(links).strength(1).distance(20).iterations(10))
	// 	.on('tick', function () {
	// 		console.log('ugh');
	// 		// for (var i = 0, q = quadtree(nodes); i < N; ++i) {
	// 		// 	q.visit(logo_collide(nodes[i + 1]));
	// 		// }
	// 		// lr.attr('x', function (d) {
	// 		// 	return Math.round(d.x);
	// 		// }).attr('y', function (d) {
	// 		// 	return Math.round(d.y);
	// 		// });
	// 	});
	// // .gravity(0)
	// // .charge((d, i) => (i ? 0 : power))
	// // .linkDistance(0.1)
	// // .nodes(nodes)
	// // .links(links)
	// // .start()
	// // .on('tick', function () {
	// // 	for (var i = 0, q = quadtree(nodes); i < N; ++i) {
	// // 		q.visit(logo_collide(nodes[i + 1]));
	// // 	}
	// // 	lr.attr('x', function (d) {
	// // 		return Math.round(d.x);
	// // 	}).attr('y', function (d) {
	// // 		return Math.round(d.y);
	// // 	});
	// // });
	// function logo(el) {
	// 	// add force layout interaction
	// 	function make(o) {
	// 		return { x: o.x, y: o.y, fixed: true, radius: 0 };
	// 	}
	// 	nodes.push.apply(nodes, nodes.map(make));
	// 	nodes.unshift(make({ x: 10000, y: 10000 }));

	// 	// svg;
	// }

	// function move() {
	// 	var p1 = d3.mouse(this);
	// 	nodes[0].px = p1[0] - tx;
	// 	nodes[0].py = p1[1] - ty;
	// 	force.resume();
	// }

	// function off() {
	// 	nodes[0].px = nodes[0].py = 10000;
	// 	force.resume();
	// }

	// function logo_collide(node) {
	// 	var r = node.radius + 16;
	// 	var nx1 = node.x - r;
	// 	var nx2 = node.x + r;
	// 	var ny1 = node.y - r;
	// 	var ny2 = node.y + r;
	// 	return function (quad, x1, y1, x2, y2) {
	// 		if (quad.point && quad.point !== node) {
	// 			var x = node.x - quad.point.x,
	// 				y = node.y - quad.point.y,
	// 				l = Math.sqrt(x * x + y * y),
	// 				r = node.radius + quad.point.radius;
	// 			if (l < r) {
	// 				l = ((l - r) / l) * 0.5;
	// 				node.x -= x *= l;
	// 				node.y -= y *= l;
	// 				quad.point.x += x;
	// 				quad.point.y += y;
	// 			}
	// 		}
	// 		return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	// 	};
	// }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a href={`/${base}`} class="relative">
	<img src={`${base}/images/logo/idl-logo.png`} alt="idl logo" class="" />
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- <svg {width} {height} on:mousemove={move} on:touchmove={move} on:mouseout={off} on:touchend={off}
		><g transform={`translate(${tx}, ${ty})`}>
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
	> -->
</a>
