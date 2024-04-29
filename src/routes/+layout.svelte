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
		$page.url.pathname.split('/').filter((x) => x && x !== 'idlweb')[0] ||
		'home';
	$: subtitle = pageName === 'home' ? 'Visualization + Analysis' : pageName;
</script>

<div class="p-0 m-0 font-sans pl-5 pr-5 pt-2 pb-5">
	<div class="md:hidden flex justify-between mb-3 text-xs tracking-wider uppercase">
		{#each mobile as section}
			{#if pageName === section.name}
				<a class="font-semibold" href={section.href}>{section.name}</a>
			{:else}
				<a href={section.href}>{section.name}</a>
			{/if}
		{/each}
	</div>

	<div class="flex w-full md:w-fit md:max-w-4xl overflow-x-hidden">
		<div class="hidden md:flex flex-col justify-between fixed top-0 h-screen">
			<div class="flex flex-col mb-4">
				<Logo />
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
			</div>
			<div class="mb-4">
				<a
					class="block"
					href="http://dub.washington.edu/"
					title="dub: Design, Use, Build - Human-Computer Interaction &amp; Design"
					><img
						class="w-11 rounded halo"
						src={`${base}/images/logo/dub.png`}
						alt="dub logo"
					/></a
				>
				<a class="block mt-3" href="http://cs.washington.edu/" title="UW Computer Science &amp; Engineering"
					><img
						class="w-11 rounded halo"
						src={`${base}/images/logo/cse.png`}
						alt="uw computer science and engineering logo"
					/></a
				>
			</div>
		</div>
		<div class="flex flex-col w-full md:py-1.5 md:pr-10 md:pl-24">
			<h1 class="flex-col md:flex-row items-center mb-3 md:mb-4">
				<div class="inline-block text-xl md:text-3xl mr-3">
					<img
					  class="md:hidden inline w-8 mr-1"
						style="margin-top: -5px;"
						src={`${base}/images/logo/idl-300.png`}
						alt="IDL logo"
					/>
					<span class="font-medium text-uw">UW</span> Interactive Data Lab
				</div>
				<div class="hidden md:inline-block uppercase text-lg md:text-xl tracking-wider text-gray-500">{subtitle}</div>
			</h1>
			<div class="article">
				<slot />
			</div>
		</div>
	</div>
</div>
