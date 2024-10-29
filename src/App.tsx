
import { RouterProvider } from 'react-router-dom'
import router from './router'

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster } from "@/components/ui/sonner"

const theme = createTheme({
  palette: {
    mode: 'light', 
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App