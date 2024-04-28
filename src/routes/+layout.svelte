<script>
	import '../fonts.css';
	import Logo from '$lib/logo.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import '../app.css';
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
	$: pageName =
		$page.url.pathname.split('/').filter((x) => x && x !== 'idlweb')[0] ||
		'Visualization + Analysis';
</script>

<div class="p-0 m-0 font-sans pl-5 pr-5 pt-2 pb-6">
	<div class="flex justify-between md:hidden">
		{#each sections as section}
			<a class="uppercase font-thin text-xs tracking-wider mb-2" href={section.href}
				>{section.name}</a
			>
		{/each}
	</div>

	<div class="flex w-full md:w-fit md:max-w-4xl overflow-x-hidden">
		<div class="flex-col h-full hidden md:flex">
			<Logo />
			{#each sections as section}
				<a class="uppercase font-medium text-2xs tracking-extra mb-2" href={section.href}
					>{section.name}</a
				>
			{/each}
			<!-- svelte-ignore a11y-missing-content -->
			<a class="twitter" title="Follow Us on Twitter" href="http://twitter.com/uwdata"></a>
			<div class="orgs fixed bottom-4">
				<a
					class="block"
					href="http://dub.washington.edu/"
					title="dub: Design, Use, Build - Human-Computer Interaction &amp; Design"
					><img class="w-12 rounded halo" src={`${base}/images/logo/dub.png`} alt="dub logo" /></a
				>
				<a class="block mt-2" href="http://escience.washington.edu/" title="eScience Institute"
					><img
						class="w-12 rounded halo"
						src={`${base}/images/logo/escience.png`}
						alt="e-science logo"
						/></a
				>
				<a class="block mt-2" href="http://cs.washington.edu/" title="UW Computer Science &amp; Engineering"
					><img
						class="w-12 rounded halo"
						src={`${base}/images/logo/cse.png`}
						alt="computer science and engineering logo"
					/></a
				>
			</div>
		</div>
		<div class="flex flex-col w-full md:py-1.5 md:pr-10 md:pl-12">
			<h1 class="flex-col md:flex-row items-center mb-4 header">
				<div class="text-3xl md:mr-2 mark">
					<span class="font-medium" style="color: #652c90">UW</span>
					Interactive Data Lab
				</div>
				<div id="title">{pageName}</div>
			</h1>
			<div class="article">
				<slot />
			</div>
		</div>
	</div>
</div>

<style>
/* .orgs a img:hover {
    box-shadow: 2px 2px 18px #8a5ed3;
} */
</style>