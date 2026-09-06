import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./providers/router/AppRouter.tsx";

export function App() {

  return (
      <MantineProvider>
          <AppRouter />
      </MantineProvider>
  )
}

export default App
