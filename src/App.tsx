import PageWrapper from './components/PageWrapper'
import { ThemeProvider } from './@/components/ui/ThemeProvider'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Session from './components/Session';
import Finished from './components/Finished';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PageWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="session" element={<Session />} />
            <Route path="finished" element={<Finished />} />
          </Routes>
        </Router>
      </PageWrapper>
    </ThemeProvider>
  )
}

export default App
