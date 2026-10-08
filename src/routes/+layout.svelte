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
      href: `${base}/blog` // 'https://medium.com/@uwdata'
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
    ...sections.filter((s) => !['video'].includes(s.name))
  ];

  $: pageName =
    $page.url.pathname.split('/').filter((x) => x && x !== 'uwdata.github.io')[0] || 'home';
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
      <a
        class="social w-4 rounded"
        title="@idl.uw.edu on Bluesky"
        href="https://bsky.app/profile/idl.uw.edu"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.697-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948Z"
          ></path>
        </svg>
      </a>
    </nav>
    <div class="mb-4">
      <a
        class="block w-11"
        href="http://dub.washington.edu/"
        title="dub: Design, Use, Build - Human-Computer Interaction &amp; Design"
        ><img class="rounded halo" src={`${base}/images/logo/dub.png`} alt="dub logo" /></a
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
        <span class="hidden md:inline ml-3 uppercase text-xl tracking-wider text-gray-500"
          >{subtitle}</span
        >
      </div>
      <div class="md:hidden w-9">
        <img src={`${base}/images/logo/idl-300.png`} alt="IDL logo" />
      </div>
    </header>
    <div class="md:pt-2">
      <slot />
    </div>
  </div>
</div>
