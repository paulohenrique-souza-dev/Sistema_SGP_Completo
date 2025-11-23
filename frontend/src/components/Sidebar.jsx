import logo from "../assets/logo.png";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">

      {/* LOGO */}
      <div className="flex justify-center -mt-8">
        <img
          src={logo}
          alt="Logo da Empresa"
          className="h-52 w-52 object-contain"
        />
      </div>

      {/* MENU */}
      <nav className="flex-1 mt-2 px-4 flex flex-col gap-2">
        <a href="#" className="px-4 py-2 rounded hover:bg-slate-700 transition">
          Dashboard
        </a>
        <a href="#" className="px-4 py-2 rounded hover:bg-slate-700 transition">
          Produtos
        </a>
        <a href="#" className="px-4 py-2 rounded hover:bg-slate-700 transition">
          Clientes
        </a>
        <a href="#" className="px-4 py-2 rounded hover:bg-slate-700 transition">
          Vendas
        </a>
        <a href="#" className="px-4 py-2 rounded hover:bg-slate-700 transition">
          Relatórios
        </a>
      </nav>
    </aside>
  );
}
