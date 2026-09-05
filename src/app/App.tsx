import { MantineProvider } from "@mantine/core";
import { AppRouter } from "@/app/providers/AppRouter.tsx";

export function App() {

  return (
    <>
      <MantineProvider>
        <AppRouter />
      </MantineProvider>
    </>
  )
}

export default App
