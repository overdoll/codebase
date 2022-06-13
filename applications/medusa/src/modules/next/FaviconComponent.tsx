function prefixStaticUrl (url: string): string {
  return `${process.env.STATIC_ASSETS_URL as string}${url}`
}

const FaviconComponent = (): JSX.Element => {
  return (
    <>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href={prefixStaticUrl('/favicon/apple-touch-icon.png')}
      />
      <link rel='icon' type='image/png' sizes='32x32' href={prefixStaticUrl('/favicon/favicon-32x32.png')} />
      <link rel='icon' type='image/png' sizes='16x16' href={prefixStaticUrl('/favicon/favicon-16x16.png')} />
      <link rel='mask-icon' href={prefixStaticUrl('/favicon/safari-pinned-tab.svg')} color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#212121' />
      <meta name='theme-color' content='#212121' />
      <link rel='manifest' href={prefixStaticUrl('/manifest/site.webmanifest')} />
    </>
  )
}

export default FaviconComponent
