<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:stmp="http://www.sitemaps.org/schemas/sitemap/0.9">

	<xsl:output method="html" />

	<xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>Sitemap - LTT Discussion</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.localtransport.today/sitemap.xml" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather:300,300i,400,400i,700,700i,900,900i&amp;display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather+Sans:300,300i,400,400i,700,700i,800,800i&amp;display=swap" />
				<link rel="stylesheet" href="/sitemap.css" type="text/css" />
			</head>
			<body>
        <div id="__nuxt">
          <div id="__layout">
            <div>
              <div>
                <header id="header" role="banner" class="w-full ltt-header fixed top-0 left-0 right-0 z-50">
                  <nav role="navigation" class="w-full flex flex-col lg:flex-row lg:justify-between font-sans block text-sm px-6 py-3 leading-normal md:leading-none">
                    <div class="flex flex-row justify-between">
                      <div class="block self-center">
                        <h1><a href="/" class="font-sans ltt-text-red no-underline tracking-wide">LTT<span class="ltt-text-gray font-serif italic tracking-normal"> Discussion</span></a></h1>
                      </div>
                    </div>
                  </nav>
                </header>
                <div role="main" id="main" class="w-full overflow-hidden flex flex-wrap justify-center pt-8">
                  <div class="mt-10 px-2 md:px-6 lg:px-4 max-w-xs md:max-w-lg">
                    <h1 class="font-sans font-extrabold leading-tight md:leading-tighter ltt-text-red mb-4 text-4xl md:text-6xl lg:mt-0">Sitemap</h1>
                    <div class="content-text-spacing font-serif text-gray-333 leading-normal text-base md:text-xl">
                      <ul class="pl-0">
                        <xsl:for-each select="/stmp:urlset/stmp:url">
                          <li>
                            <a href="{stmp:loc}" class="no-underline hover:underline focus:underline"><xsl:value-of select="stmp:loc" /></a>
                          </li>
                        </xsl:for-each>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <footer role="contentinfo" class="mt-10 w-full flex flex-wrap justify-center content-text-spacing font-serif text-black leading-normal text-base">
                <div class="flex-basis-50 border-t mb-2 lg:mb-0"><hr /></div>
                <div id="footer" class="flex-basis-100 flex flex-col lg:flex-row mx-6 my-4">
                  <p class="flex-basis-100 text-left md:text-center">Proudly created by <a href="http://localtransporttoday.co.uk" class="no-underline hover:underline focus:underline">Local Transport Today</a> and <a href="http://www.landor.co.uk/" class="no-underline hover:underline focus:underline">Landor LINKS</a>.</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </body>
		</html>
  </xsl:template>

</xsl:stylesheet>
