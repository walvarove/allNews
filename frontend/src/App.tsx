import "primeicons/primeicons.css"; //icons
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { Header } from "./components/common/Header";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { PathRoutes } from './core/lib/Menu';
import { ArchivePage } from './pages/ArchivePage';
import { MainPage } from './pages/MainPage';

function App() {

  const queryClient = new QueryClient()

  return (
    <div className="App  h-full">
      <QueryClientProvider client={queryClient}>
        <Header /> 
        <Routes>
          <Route path={PathRoutes.HOME} element={<MainPage />} />
          <Route  element={<ProtectedRoute />}>
            <Route path={PathRoutes.PROFILE} element={<ArchivePage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
