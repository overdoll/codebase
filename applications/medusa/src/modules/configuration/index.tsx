import { createContext, useContext, useMemo } from 'react'

interface Props {
  children: JSX.Element
  headers: Configuration
}

interface Configuration {
  Accept: string[]
}

const ConfigurationContext = createContext<Configuration>({ Accept: [] })

export function ConfigurationProvider ({
  children,
  headers
}: Props): JSX.Element {
  return (
    <ConfigurationContext.Provider value={headers}>
      {children}
    </ConfigurationContext.Provider>
  )
}

function useConfiguration (): Configuration {
  const context = useContext(ConfigurationContext)

  if (context === undefined) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider')
  }

  return context
}

export function useHasMimeTypeAcceptHeader (mimeType: string): boolean {
  const config = useConfiguration()

  return useMemo(() => {
    let hasMimeType = false

    config.Accept.forEach((value) => {
      if (value === mimeType) {
        hasMimeType = true
      }
    })

    return hasMimeType
  }, [config.Accept, mimeType])
}
