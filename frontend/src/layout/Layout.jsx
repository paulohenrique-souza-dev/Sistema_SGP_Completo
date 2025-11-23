import { Outlet, Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Layout() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Produtos", path: "/produtos", icon: <FaBoxOpen /> },
    { name: "Clientes", path: "/clientes", icon: <FaUsers /> },
    { name: "Vendas", path: "/vendas", icon: <FaShoppingCart /> },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "bg-slate-700 text-white"
      : "text-gray-200 hover:bg-slate-700 hover:text-white transition";

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">

        {/* LOGO */}
        <div className="flex flex-col items-center p-8 border-b border-slate-800">
          <img
            src={logo}
            alt="Logo"
            className="
              w-full               /* ocupa 100% da largura */
              max-w-[300px]       /* limite opcional para não estourar */
              h-auto
              object-contain
              transition-transform
              duration-700
              ease-in-out
              transform
              hover:scale-110
              hover:rotate-3
            "
          />

          <h1 className="mt-4 text-lg font-bold text-white text-center">Super SGP Vendas e Gestão de Produtos</h1>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive(item.path)}`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RODAPÉ */}
        <div className="p-4 text-gray-400 text-sm border-t border-slate-800 text-center">
          © 2025 PHS Systems.
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="bg-white shadow-md flex items-center justify-between px-6 py-4 sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-700 tracking-wide">
            Super SGP Análise & Gestão de Vendas
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="font-medium text-gray-700">Olá, Admin</span>
              <span className="text-sm text-gray-400">Administrador</span>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              A
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-full mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
