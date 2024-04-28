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
		<div class="hidden md:flex fixed top-0 flex-col justify-between" style="height: 100vh;">
			<div class="flex flex-col mb-4">
				<Logo />
				{#each sections as section}
					<a class="uppercase font-medium text-2xs tracking-extra mb-1.5" href={section.href}
						>{section.name}</a
					>
				{/each}
				<!-- svelte-ignore a11y-missing-content -->
				<a class="twitter" title="Follow Us on Twitter" href="http://twitter.com/uwdata"></a>
			</div>
			<div class="mb-2">
				<a
					class="block"
					href="http://dub.washington.edu/"
					title="dub: Design, Use, Build - Human-Computer Interaction &amp; Design"
					><img class="w-11 rounded halo" src={`${base}/images/logo/dub.png`} alt="dub logo" /></a
				>
				<a class="block mt-1.5" href="http://escience.washington.edu/" title="eScience Institute"
					><img
						class="w-11 rounded halo"
						src={`${base}/images/logo/escience.png`}
						alt="e-science logo"
						/></a
				>
				<a class="block mt-1.5" href="http://cs.washington.edu/" title="UW Computer Science &amp; Engineering"
					><img
						class="w-11 rounded halo"
						src={`${base}/images/logo/cse.png`}
						alt="computer science and engineering logo"
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

<style>
.twitter {
	display: inline-block;
	vertical-align: middle;
	width: 18px;
	height: 15px;
	background-position: 1px 2px;
	background-image: url(data:image/png;base64,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);
	border: 1px solid #fff;
	border-radius: 4px;
}

.twitter:hover {
	background-color: #ca9eff;
	border-color: #8a5ed3;
}
</style>