<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>BlackRock - Global Investment Management</title>
<!-- Tailwind CSS v3 with forms and container queries -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandYellow: '#FFCE00',
            cardBeige: '#F7F5EE',
            bannerBg: '#040404',
            footerBg: '#000000',
          },
          fontFamily: {
            sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
          }
        }
      }
    }
  </script>
<style data-purpose="custom-utilities">
    /* Subtle custom styles for crisp corporate rendering */
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    /* Mobile navigation */
    .mobile-menu {
      max-height: 0;
      opacity: 0;
      visibility: hidden;
      overflow: hidden;
      transition: max-height 280ms ease, opacity 180ms ease, visibility 180ms ease;
    }
    .mobile-menu.is-open {
      max-height: calc(100dvh - 4rem);
      opacity: 1;
      visibility: visible;
      overflow-y: auto;
    }
    #mobile-menu-toggle[aria-expanded="true"] .menu-icon-open { display: none; }
    #mobile-menu-toggle[aria-expanded="true"] .menu-icon-close { display: block; }
    @media (prefers-reduced-motion: reduce) {
      .mobile-menu { transition: none; }
    }
  </style>
</head>
<body class="bg-white text-black font-sans">
<!-- BEGIN: TopUtilityHeader -->
<!-- Topmost utility navigation with brand portfolio links -->
<header class="w-full bg-[#fbfbfb] border-b border-gray-200 text-[11px] text-gray-700 py-1.5 px-4 sm:px-6 lg:px-8">
<div class="max-w-[1400px] mx-auto flex flex-wrap items-center gap-x-6 gap-y-1">
<a class="hover:text-black transition-colors font-medium" href="#">DPC GMNI</a>
<a class="hover:text-black transition-colors font-normal text-gray-500" href="#">iShares</a>
<a class="hover:text-black transition-colors font-normal text-gray-500" href="#">Aladdin</a>
<a class="hover:text-black transition-colors font-normal text-gray-500" href="#">Our Company</a>
</div>
</header>
<!-- END: TopUtilityHeader -->
<!-- BEGIN: MainNavigationBar -->
<!-- Main sticky-ready header containing primary brand navigation and actions -->
<nav aria-label="Main Navigation" class="w-full bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
<div class="max-w-[1400px] mx-auto flex items-center justify-between">
<!-- Left side: Logo and Navigation Links -->
<div class="flex items-center space-x-4 xl:space-x-10">
<!-- Brand Wordmark Logo -->
<a class="inline-flex flex-col text-black leading-tight" href="#" style="width: fit-content;"><span class="text-[24px] sm:text-[28px] font-black tracking-tight leading-none">DPC GMNI</span><span class="text-[8.5px] font-semibold text-gray-500 mt-0.5 uppercase" style="width: 100%; letter-spacing: 0.285em; text-indent: 0.285em; text-align: center;">Sukabumi Raya</span></a>
<!-- Menu Links -->
<div class="hidden xl:flex items-center space-x-7 text-[14px] font-semibold text-neutral-800">
<a class="hover:text-black transition-colors" href="#">About Us</a>
<a class="hover:text-black transition-colors" href="#">Newsroom</a>
<a class="hover:text-black transition-colors" href="#">Insights</a>
<a class="hover:text-black transition-colors" href="#">Investor Relations</a>
<a class="hover:text-black transition-colors" href="#">Corporate Sustainability</a>
<a class="hover:text-black transition-colors" href="#">Careers</a>
</div>
</div>
<!-- Right side: Local Websites button, Search icon, and mobile menu toggle -->
<div class="flex items-center space-x-2 md:space-x-5">
<a class="hidden md:inline-block bg-[#FFCC00] hover:bg-[#ebbd00] transition-colors text-black text-[13px] font-bold px-4 py-2 rounded-sm tracking-normal" href="#">
          Local websites
        </a>
<button aria-label="Search" class="p-1.5 hover:text-gray-600 transition-colors" type="button">
<svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
<path d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
<button aria-controls="mobile-menu" aria-expanded="false" aria-label="Open navigation menu" class="xl:hidden p-1.5 -mr-1.5 hover:text-gray-600 transition-colors" id="mobile-menu-toggle" type="button">
<svg aria-hidden="true" class="menu-icon-open w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
<svg aria-hidden="true" class="menu-icon-close hidden w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</button>
</div>
</div>
<!-- Mobile dropdown menu -->
<div aria-hidden="true" class="mobile-menu absolute left-0 right-0 top-full z-50 bg-white border-b border-gray-200 shadow-lg xl:hidden" id="mobile-menu">
<div class="px-4 sm:px-6 py-3">
<a class="block border-b border-gray-100 py-3 text-[15px] font-semibold text-neutral-800 hover:text-black transition-colors" href="#">About Us</a>
<a class="block border-b border-gray-100 py-3 text-[15px] font-semibold text-neutral-800 hover:text-black transition-colors" href="#">Newsroom</a>
<a class="block border-b border-gray-100 py-3 text-[15px] font-semibold text-neutral-800 hover:text-black transition-colors" href="#">Insights</a>
<a class="block border-b border-gray-100 py-3 text-[15px] font-semibold text-neutral-800 hover:text-black transition-colors" href="#">Investor Relations</a>
<a class="block border-b border-gray-100 py-3 text-[15px] font-semibold text-neutral-800 hover:text-black transition-colors" href="#">Corporate Sustainability</a>
<a class="block border-b border-gray-100 py-3 text-[15px] font-semibold text-neutral-800 hover:text-black transition-colors" href="#">Careers</a>
<a class="mt-4 mb-1 flex w-full items-center justify-center rounded-sm bg-[#FFCC00] px-4 py-3 text-[14px] font-bold text-black hover:bg-[#ebbd00] transition-colors" href="#">Local websites</a>
</div>
</div>
</nav>
<!-- END: MainNavigationBar -->
<!-- BEGIN: MainContent -->
<main class="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12 lg:space-y-16">
<!-- BEGIN: HeroCardSection -->
<!-- Large prominent black card container featuring portfolio management insights -->
<section class="bg-black text-white rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 md:p-10 lg:p-14 overflow-hidden" data-purpose="hero-banner">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
<!-- Left: Text Content -->
<div class="lg:col-span-7 pr-0 md:pr-4 space-y-6">
<h1 class="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.15] tracking-tight">
            Unlocking the whole portfolio
          </h1>
<p class="text-gray-300 text-[16px] leading-[1.6] max-w-xl">
            Explore how advances in data, analytics and technology are helping investors manage public and private assets together as part of an integrated whole portfolio, supporting stronger portfolio construction, asset allocation and risk management.
          </p>
<div class="pt-4">
<a class="inline-block w-full sm:w-auto text-center bg-white text-black hover:bg-gray-100 font-bold text-[14px] px-6 py-3.5 rounded-sm transition-colors" href="#">
              Read the latest On the Record paper
            </a>
</div>
</div>
<!-- Right: Architectural colorful facade graphic artwork -->
<div class="lg:col-span-5 flex justify-center">
<div class="w-full max-w-[460px] h-[220px] sm:h-[260px] md:h-[320px] flex items-center justify-center"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC1FZ2PoUlOZpEy9dIF3HEnQgmnfXozkD5oogC98kxA68RKUkPYkWwKu_r1ybNlt4PJYcd5Bzx_h0VUJYUc6j4mjp_wqn4YVZqFbGmo_YCqNVBFSY2d7fQMoesq60B3zX8rc9j5GeT2IJ9yATwYciFSYJjItfSAwG-5PPmg-_ONrFKJ2E1YkxMLtm0ITPg67w3o81hQdVXkdFfQLsiwW9P_I6427-ndyn7D0J81BjeIxJ1Sr3EtU35" alt="DPC GMNI Logo" class="max-w-full max-h-full object-contain drop-shadow-xl"></div>
</div>
</div>
</section>
<!-- END: HeroCardSection -->
<!-- BEGIN: PressReleaseSection -->
<!-- Two-column news section highlighting recent press release and newsroom CTA -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start pt-4" data-purpose="press-releases">
<!-- Left Column: Press Release Detail -->
<div class="lg:col-span-7 space-y-4 pr-0 md:pr-6">
<span class="text-[12px] font-bold tracking-wider text-black uppercase">PRESS RELEASE</span>
<h2 class="text-2xl lg:text-[26px] font-bold text-black leading-snug">DPC GMNI Future Builders Expands Nationwide to Help Thousands of American Workers</h2>
<p class="text-gray-700 text-[14px] leading-relaxed">The DPC GMNI Foundation is awarding 15 organizations with grants through the first round of DPC GMNI Future Builders' $25 million national Request for Proposals (RFP).</p>
<div class="pt-1">
<a class="text-[14px] font-bold text-black underline underline-offset-4 hover:text-neutral-600 transition-colors" href="#">
            Read the press release
          </a>
</div>
</div>
<!-- Right Column: Stay Current CTA -->
<div class="lg:col-span-5 space-y-6 lg:pl-10">
<h2 class="text-2xl lg:text-[30px] font-bold text-black leading-tight">Stay current with the latest news and announcements from DPC GMNI.</h2>
<div>
<a class="inline-flex w-full sm:w-auto items-center justify-center space-x-2 bg-black text-white hover:bg-neutral-800 font-bold text-[14px] px-6 py-3 rounded-sm transition-colors" href="#">
<span>Visit the Newsroom</span>
<span class="text-base">→</span>
</a>
</div>
</div>
</section>
<!-- END: PressReleaseSection -->
<!-- BEGIN: TwoColumnFeatureCards -->
<!-- Informational Feature Cards with warm off-white background -->
<section class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" data-purpose="feature-cards">
<!-- Card 1: Philanthropic Initiative -->
<article class="bg-[#F7F5EE] p-6 sm:p-8 lg:p-9 rounded-[8px] flex flex-col justify-between space-y-6">
<div class="space-y-4">
<h3 class="text-[20px] font-bold text-black leading-snug">DPC GMNI launches $100 million philanthropic initiative</h3>
<p class="text-neutral-700 text-[14px] leading-relaxed">The DPC GMNI Foundation is funding a national effort to train and support 50,000 American workers as they pursue careers in skilled trades.</p>
</div>
<div>
<a class="inline-flex items-center space-x-2 text-[14px] font-bold text-black hover:text-neutral-600 transition-colors" href="#">
<span>Learn more about DPC GMNI Future Builders</span>
<span>→</span>
</a>
</div>
</article>
<!-- Card 2: Global Weekly Commentary -->
<article class="bg-[#F7F5EE] p-6 sm:p-8 lg:p-9 rounded-[8px] flex flex-col justify-between space-y-6">
<div class="space-y-4">
<h3 class="text-[20px] font-bold text-black leading-snug">
            Global Weekly Commentary
          </h3>
<p class="text-neutral-700 text-[14px] leading-relaxed">Each week, we publish new insights from some of the top DPC GMNI investment experts, delving into emerging topics and latest trends in the global financial markets.</p>
</div>
<div>
<a class="inline-flex items-center space-x-2 text-[14px] font-bold text-black hover:text-neutral-600 transition-colors" href="#">
<span>Read our weekly market commentary</span>
<span>→</span>
</a>
</div>
</article>
</section>
<!-- END: TwoColumnFeatureCards -->
<!-- BEGIN: ChairmansLetterSection -->
<!-- Full-width dark card container with Larry Fink portrait and letter highlights -->
<section class="bg-black text-white rounded-[16px] p-6 sm:p-8 lg:p-12 overflow-hidden" data-purpose="chairmans-letter">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
<!-- Left: Executive Portrait & Artwork Attribution -->
<div class="lg:col-span-5 flex flex-col items-center">
<div class="relative w-full max-w-[420px] aspect-[4/3] rounded-sm overflow-hidden bg-neutral-800 shadow-xl">
<!-- Simulated Larry Fink portrait composition -->
<img alt="Portrait of Larry Fink, Chairman and CEO of BlackRock" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzldjR6py-5kKmEkTl27rZB4-XubMZYit99GJKhgPvDeYc0BhXYTDqkmOk7b_zaKjlb4rzj97umd8rk-4rQYpPJpcv6LXsBspgXQND9s-XXSjhYwuPjk-v_o4Cy2N1v66hHZnyieXzzkZ0FY2UZHGKJ5sHhLYq0Wr1_YLQzj6uuoe51ljOsHrNHLyR-Qdi-wEgc1DanpGW-UMp236wBVsY35Sg_EK3n12G1jL5vpc">
<div class="absolute bottom-2 left-0 right-0 px-4 text-center">
<p class="text-[9px] text-gray-400 font-sans tracking-tight leading-tight bg-black/60 backdrop-blur-sm py-1 px-2 rounded">
                Image courtesy of Jerry Goldberg and BlackRock.<br>
                Artwork © Wayne Thiebaud, 1977-1978, all rights reserved by artist.
              </p>
</div>
</div>
</div>
<!-- Right: Text & Call to Action -->
<div class="lg:col-span-7 space-y-6 lg:pl-4">
<h2 class="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-[1.2] tracking-tight">
            Growing with your country: Thoughts from a long-term optimist
          </h2>
<p class="text-gray-300 text-[15px] leading-relaxed max-w-xl">
            In his 2026 Chairman's Letter to Investors, Larry Fink explores how long-term investing can help more people share in their country's growth as geopolitical change and AI are reshaping the global economy.
          </p>
<div class="pt-3">
<a class="inline-block w-full sm:w-auto text-center bg-white text-black hover:bg-gray-100 font-bold text-[14px] px-6 py-3.5 rounded-sm transition-colors" href="#">
              Read Larry Fink's letter
            </a>
</div>
</div>
</div>
</section><section class="relative w-full rounded-[24px] bg-[#ededed] py-14 xl:py-28 px-4 xl:px-6 overflow-hidden flex flex-col items-center justify-center min-h-0 xl:min-h-[640px] select-none my-8 xl:my-12" data-purpose="ai-real-research">
  <!-- Orbiting image thumbnails (desktop/tablet) -->
  <div class="pointer-events-none absolute inset-0 hidden xl:block">
  <!-- 1. Top left (inner): VR headset / medical lab workers -->
  <div class="absolute top-10 left-[32%] w-28 h-28 rounded-2xl overflow-hidden shadow-lg transform -translate-x-1/2 hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="VR technology research" class="w-full h-full object-cover">
  </div>

  <!-- 2. Top center: Fighter jet cockpit -->
  <div class="absolute top-6 left-[48%] w-24 h-24 rounded-2xl overflow-hidden shadow-lg transform -translate-x-1/2 hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f6?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Advanced aerospace jet" class="w-full h-full object-cover">
  </div>

  <!-- 3. Top right: Night vision / tactical operations -->
  <div class="absolute top-4 left-[63%] w-20 h-20 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Night vision operations" class="w-full h-full object-cover">
  </div>

  <!-- 4. Far top right: Specialist doctor with visor -->
  <div class="absolute top-16 right-[22%] w-16 h-16 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&amp;fit=crop&amp;w=200&amp;q=80" alt="Medical specialist" class="w-full h-full object-cover">
  </div>

  <!-- 5. Mid left (outer): City aerial view and coastline -->
  <div class="absolute top-24 left-[18%] w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Aerial city and coast" class="w-full h-full object-cover">
  </div>

  <!-- 6. Far left: Cell tower in dense forest -->
  <div class="absolute top-[44%] left-[8%] w-36 h-36 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Telecommunications infrastructure in forest" class="w-full h-full object-cover">
  </div>

  <!-- 7. Bottom left: Offshore marine energy rig -->
  <div class="absolute bottom-14 left-[15%] w-36 h-36 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Offshore marine platform" class="w-full h-full object-cover">
  </div>

  <!-- 8. Bottom center-left: Surgeon with precision surgical headgear -->
  <div class="absolute bottom-8 left-[31%] w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Robotic surgery research" class="w-full h-full object-cover">
  </div>

  <!-- 9. Bottom center: High-tech microscope lens -->
  <div class="absolute bottom-10 left-[46%] w-28 h-28 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Microscope lens laboratory optics" class="w-full h-full object-cover">
  </div>

  <!-- 10. Bottom center-right: Stage conversation armchairs -->
  <div class="absolute bottom-16 right-[35%] w-24 h-24 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Live discussion panel" class="w-full h-full object-cover">
  </div>

  <!-- 11. Mid right: Industrial / machinery operator -->
  <div class="absolute top-[48%] right-[23%] w-20 h-20 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Industrial machinery operator" class="w-full h-full object-cover">
  </div>

  <!-- 12. Far right: Autonomous vehicle in city -->
  <div class="absolute top-[32%] right-[14%] w-14 h-14 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 pointer-events-auto">
    <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&amp;fit=crop&amp;w=200&amp;q=80" alt="Autonomous city vehicle" class="w-full h-full object-cover">
  </div>
  </div>

  <!-- Center Content -->
  <div class="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl px-4">
    <div class="space-y-1">
      <h2 class="text-4xl sm:text-5xl xl:text-6xl font-medium tracking-tight text-black">
        Artificial Intelligence
      </h2>
      <h3 class="text-4xl sm:text-5xl xl:text-6xl font-normal tracking-tight">
        <span class="text-black font-medium">Real </span><span class="text-[#a8947f] font-normal">Research</span>
      </h3>
    </div>
    <div class="pt-2">
      <a href="#" class="inline-block px-7 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-lg shadow-sm hover:shadow hover:bg-neutral-50 transition-all border border-gray-200/60">
        Get Started
      </a>
    </div>
  </div>
  <!-- Mobile image grid -->
  <div class="relative z-10 mt-10 grid w-full max-w-md grid-cols-3 gap-2.5 sm:gap-3 xl:hidden">
    <div class="aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="VR technology research" class="h-full w-full object-cover" loading="lazy">
    </div>
    <div class="aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img src="https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f6?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Advanced aerospace jet" class="h-full w-full object-cover" loading="lazy">
    </div>
    <div class="aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Aerial city and coast" class="h-full w-full object-cover" loading="lazy">
    </div>
    <div class="aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Telecommunications infrastructure in forest" class="h-full w-full object-cover" loading="lazy">
    </div>
    <div class="aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Offshore marine platform" class="h-full w-full object-cover" loading="lazy">
    </div>
    <div class="aspect-square overflow-hidden rounded-2xl shadow-lg">
      <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&amp;fit=crop&amp;w=300&amp;q=80" alt="Robotic surgery research" class="h-full w-full object-cover" loading="lazy">
    </div>
  </div>
</section>
<!-- END: ChairmansLetterSection -->
</main>
<!-- END: MainContent -->
<!-- BEGIN: LearnMoreBand -->
<!-- Subtle warm beige navigation strip -->
<section class="w-full bg-[#F7F5EE] py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 lg:mt-16" data-purpose="learn-more-band">
<div class="max-w-[1400px] mx-auto space-y-4">
<h2 class="text-3xl font-bold text-black tracking-tight">
        Learn more
      </h2>
<div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] font-bold text-black">
<a class="underline underline-offset-4 hover:text-neutral-600 transition-colors" href="#">About DPC GMNI</a>
<span class="text-neutral-400 font-normal">|</span>
<a class="underline underline-offset-4 hover:text-neutral-600 transition-colors" href="#">Careers</a>
</div>
</div>
</section>
<!-- END: LearnMoreBand -->
<!-- BEGIN: GlobalFooter -->
<!-- Deep black multi-column corporate footer with links & compliance -->
<footer class="w-full bg-black text-white pt-12 pb-14 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8" data-purpose="global-footer">
<div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
<!-- Column 1: Company Profile Statement (5 cols) -->
<div class="md:col-span-5 space-y-4 pr-0 md:pr-6">
<div class="text-[20px] font-bold tracking-tight text-white flex items-center">DPC GMNI<span class="text-[10px] align-super ml-0.5">®</span></div>
<p class="text-gray-300 text-[13px] leading-relaxed">As a global investment manager and fiduciary to our clients, our purpose at DPC GMNI is to help everyone experience financial well-being. Since 1999, we've been a leading provider of financial technology, and our clients turn to us for the solutions they need when planning for their most important goals.</p>
</div>
<!-- Column 2: Corporate Links (3.5 cols) -->
<div class="md:col-span-3 lg:col-span-3 space-y-3">
<h4 class="text-[15px] font-bold text-white mb-4">Corporate</h4>
<ul class="space-y-2.5 text-[13px] text-gray-300">
<li><a class="hover:text-white transition-colors" href="#">Fraud protection tips</a></li>
<li><a class="hover:text-white transition-colors" href="#">Careers</a></li>
<li><a class="hover:text-white transition-colors" href="#">Newsroom</a></li>
<li><a class="hover:text-white transition-colors" href="#">Investor relations</a></li>
<li><a class="hover:text-white transition-colors" href="#">UK Corporate Tax Strategy</a></li>
<li><a class="hover:text-white transition-colors" href="#">UK Gender Pay Reporting</a></li>
<li><a class="hover:text-white transition-colors" href="#">Ireland Gender Pay reporting</a></li>
<li><a class="hover:text-white transition-colors" href="#">Accessibility</a></li>
<li><a class="hover:text-white transition-colors" href="#">Responsible Disclosure</a></li>
</ul>
</div>
<!-- Column 3: Legal & Regulatory Links (3.5 cols) -->
<div class="md:col-span-4 space-y-3">
<h4 class="text-[15px] font-bold text-white mb-4">Legal</h4>
<ul class="space-y-2.5 text-[13px] text-gray-300">
<li><a class="hover:text-white transition-colors" href="#">Terms &amp; Conditions</a></li>
<li><a class="hover:text-white transition-colors" href="#">Privacy Notice</a></li>
<li><a class="hover:text-white transition-colors" href="#">Business Continuity</a></li>
<li><a class="hover:text-white transition-colors" href="#">FINRA BrokerCheck</a></li>
<li><a class="hover:text-white transition-colors" href="#">Best Ex &amp; Order Placement Policy</a></li>
<li><a class="hover:text-white transition-colors" href="#">Rule 606 Disclosure</a></li>
<li><a class="hover:text-white transition-colors" href="#">Investor Rights</a></li>
<li><a class="hover:text-white transition-colors" href="#">Cookie Notice</a></li>
</ul>
</div>
</div>
</footer>
<!-- END: GlobalFooter -->




<script>
  (() => {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    const setMenu = (open) => {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    };

    toggle.addEventListener('click', () => {
      setMenu(!menu.classList.contains('is-open'));
    });

    document.addEventListener('click', (event) => {
      if (!menu.classList.contains('is-open')) return;
      const nav = toggle.closest('nav');
      if (nav && !nav.contains(event.target)) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1280) setMenu(false);
    });
  })();
</script>
</body></html>