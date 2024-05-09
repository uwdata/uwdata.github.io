<script>
	import '../app.css';
	import '../fonts.css';
	import Logo from '$lib/logo.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const sections = [
		{
			name: 'about',
			href: `${base}/about`
		},
		{
			name: 'people',
			href: `${base}/people`
		},
		{
			name: 'papers',
			href: `${base}/papers`
		},
		{
			name: 'video',
			href: 'https://vimeo.com/channels/uwdata'
		},
		{
			name: 'blog',
			href: 'https://medium.com/@uwdata'
		},
		{
			name: 'code',
			href: 'https://github.com/uwdata'
		}
	];

	const mobile = [
		{
			name: 'home',
			href: `${base}/`
		},
		...sections.filter(s => !['video'].includes(s.name))
	]

	$: pageName =
		$page.url.pathname.split('/').filter((x) => x && x !== 'uwdata.github.io')[0] ||
		'home';
	$: subtitle = pageName === 'home' ? 'Visualization + Analysis' : pageName;
</script>

<div class="w-full md:max-w-4xl m-0 font-sans px-4 py-3 overflow-x-clip">
	<nav class="md:hidden flex justify-between mb-2 text-xs tracking-wider uppercase">
		{#each mobile as section}
			{#if pageName === section.name}
				<a class="font-semibold" href={section.href}>{section.name}</a>
			{:else}
				<a href={section.href}>{section.name}</a>
			{/if}
		{/each}
	</nav>

	<div class="hidden md:flex flex-col justify-between fixed top-0 h-screen">
		<nav class="flex flex-col mb-4">
			<div class="mb-0.5"><Logo /></div>
			{#each sections as section}
				<a class="uppercase font-medium text-2xs tracking-extra mb-1.5" href={section.href}
					>{section.name}</a
				>
			{/each}
			<a class="social w-4 rounded" title="@uwdata on Twitter/X" href="http://twitter.com/uwdata">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
				</svg>
			</a>
		</nav>
		<div class="mb-4">
			<a
				class="block w-11"
				href="http://dub.washington.edu/"
				title="dub: Design, Use, Build - Human-Computer Interaction &amp; Design"
				><img
					class="rounded halo"
					src={`${base}/images/logo/dub.png`}
					alt="dub logo"
				/></a
			>
			<a
				class="block w-11 mt-3"
				href="http://cs.washington.edu/"
				title="UW Computer Science &amp; Engineering"
				><img
					class="rounded halo"
					src={`${base}/images/logo/cse.png`}
					alt="uw computer science and engineering logo"
				/></a
			>
		</div>
	</div>

	<div class="flex flex-col w-full md:pl-24">
		<header class="flex flex-row justify-between mb-3">
			<div class="text-2xl md:text-3xl mt-1">
				<span class="font-medium text-uw">UW</span> Interactive Data Lab
				<span class="hidden md:inline ml-3 uppercase text-xl tracking-wider text-gray-500">{subtitle}</span>
			</div>
			<div class="md:hidden w-9">
				<img
					src={`${base}/images/logo/idl-300.png`}
					alt="IDL logo"
				/>
			</div>
		</header>
		<div class="md:pt-2">
			<slot />
		</div>
	</div>
</div>
