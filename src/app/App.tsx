import { Rotas } from "./routes"
import { UsuarioLogadoProvider } from "./shared/contexts/UsuarioLogado"

function App() {
  return (
    <>
      <UsuarioLogadoProvider>
        <Rotas />
      </UsuarioLogadoProvider>
    </>
  )
}

export default App
