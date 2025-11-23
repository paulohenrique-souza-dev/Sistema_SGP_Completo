import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between sticky top-0 z-20">

      {/* Logo e título */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo da Empresa"
          className="h-20 w-auto object-contain transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-2"
        />
        <h1 className="text-2xl font-bold text-gray-700 tracking-wide">
            SGP Análise e Gestão
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex gap-6 text-gray-600 font-medium">
        <a href="/" className="hover:text-cyan-600 transition">Dashboard</a>
        <a href="/produtos" className="hover:text-cyan-600 transition">Produtos</a>
        <a href="/clientes" className="hover:text-cyan-600 transition">Clientes</a>
        <a href="/vendas" className="hover:text-cyan-600 transition">Vendas</a>
      </nav>
    </header>
  );
}
