import { useEffect, useState } from "react";
import { getClientes, criarCliente, atualizarCliente } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    email: "",
    cidade: "",
    idade: ""
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    setLoading(true);
    try {
      const dados = await getClientes();
      setClientes(dados);
    } catch {
      toast.error("❌ Erro ao carregar clientes!");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...form, idade: form.idade ? Number(form.idade) : undefined };
      Object.keys(payload).forEach(
        key => (payload[key] === "" || payload[key] == null) && delete payload[key]
      );

      if (form.id) {
        await atualizarCliente(form.id, payload);
        toast.success("✅ Cliente atualizado!");
      } else {
        await criarCliente(payload);
        toast.success("✅ Cliente cadastrado!");
      }

      setForm({ id: null, nome: "", email: "", cidade: "", idade: "" });
      carregarClientes();
    } catch {
      toast.error("❌ Erro ao salvar cliente!");
    }
  }

  function handleEditar(cliente) {
    setForm({
      id: cliente.id,
      nome: cliente.nome || "",
      email: cliente.email || "",
      cidade: cliente.cidade || "",
      idade: cliente.idade || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2500} />

      <h1 className="text-4xl font-extrabold text-cyan-600 mb-6">👥 Clientes</h1>

      {/* Formulário */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-cyan-600 mb-4">
          {form.id ? "✏️ Editar Cliente" : "➕ Adicionar Cliente"}
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cidade"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            value={form.cidade}
            onChange={e => setForm({ ...form, cidade: e.target.value })}
          />
          <input
            type="number"
            placeholder="Idade"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            min={0}
            value={form.idade}
            onChange={e => setForm({ ...form, idade: e.target.value })}
          />
          <button
            type="submit"
            className="bg-cyan-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-cyan-700 transition md:col-span-2"
          >
            {form.id ? "Atualizar Cliente" : "Salvar Cliente"}
          </button>
        </form>
      </div>

      {/* Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar clientes..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Lista */}
      {loading ? (
        <p>Carregando clientes...</p>
      ) : clientesFiltrados.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {clientesFiltrados.map(c => (
            <div key={c.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="font-bold text-lg text-gray-800">{c.nome}</h3>
              {c.email && <p className="text-gray-600">{c.email}</p>}
              {c.cidade && <p className="text-gray-600">Cidade: {c.cidade}</p>}
              {c.idade != null && <p className="text-gray-600">Idade: {c.idade}</p>}
              <button
                onClick={() => handleEditar(c)}
                className="mt-2 bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
