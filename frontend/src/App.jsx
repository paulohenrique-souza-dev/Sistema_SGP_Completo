import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Vendas from "./pages/Vendas";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal com Layout */}
        <Route path="/" element={<Layout />}>
          {/* Dashboard como rota padrão */}
          <Route index element={<Dashboard />} />

          {/* Outras páginas */}
          <Route path="produtos" element={<Produtos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="vendas" element={<Vendas />} />
        </Route>

        {/* Rota 404 */}
        <Route
          path="*"
          element={
            <div className="p-6 text-red-600 font-bold">
              ❌ Página não encontrada
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
