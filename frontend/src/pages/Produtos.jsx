import { useEffect, useState } from "react";
import { getProdutos, criarProduto, atualizarProduto, excluirProduto } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: "", preco: "", estoque: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    setLoading(true);
    try {
      const dados = await getProdutos();
      setProdutos(dados);
    } catch {
      toast.error("❌ Erro ao carregar produtos!");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        nome: form.nome,
        preco: parseFloat(form.preco),
        estoque: parseInt(form.estoque)
      };

      if (editingId) {
        await atualizarProduto(editingId, payload);
        toast.success("✅ Produto atualizado!");
        setEditingId(null);
      } else {
        await criarProduto(payload);
        toast.success("✅ Produto adicionado!");
      }

      setForm({ nome: "", preco: "", estoque: "" });
      carregarProdutos();
    } catch {
      toast.error("❌ Erro ao salvar produto!");
    }
  }

  const handleEditar = (p) => {
    setEditingId(p.id);
    setForm({ nome: p.nome, preco: p.preco, estoque: p.estoque });
  };

  const handleCancelar = () => {
    setEditingId(null);
    setForm({ nome: "", preco: "", estoque: "" });
  };

  const handleExcluir = async (id) => {
    if (confirm("Deseja realmente excluir este produto?")) {
      try {
        await excluirProduto(id);
        toast.success("✅ Produto excluído!");
        carregarProdutos();
      } catch {
        toast.error("❌ Erro ao excluir produto!");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2500} />

      <h1 className="text-4xl font-extrabold text-cyan-600 mb-6">🖥️ Produtos</h1>

      {/* Formulário */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-600 mb-4">
          {editingId ? "✏️ Editar Produto" : "➕ Adicionar Produto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            value={form.preco}
            onChange={e => setForm({ ...form, preco: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Estoque"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            value={form.estoque}
            onChange={e => setForm({ ...form, estoque: e.target.value })}
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-cyan-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-cyan-700 transition flex-1"
            >
              {editingId ? "Atualizar Produto" : "Salvar Produto"}
            </button>
            {editingId && (
              <button
                type="button"
                className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-400 transition flex-1"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Produtos */}
      {loading ? (
        <p>Carregando produtos...</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-cyan-100">
              <tr>
                <th className="px-4 py-3 border-b border-gray-300">Nome</th>
                <th className="px-4 py-3 border-b border-gray-300">Preço</th>
                <th className="px-4 py-3 border-b border-gray-300">Estoque</th>
                <th className="px-4 py-3 border-b border-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id} className="hover:bg-cyan-50 transition-all">
                  <td className="px-4 py-3 border-b border-gray-200">{p.nome}</td>
                  <td className="px-4 py-3 border-b border-gray-200">R$ {p.preco.toFixed(2)}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{p.estoque ?? 0}</td>
                  <td className="px-4 py-3 border-b border-gray-200 flex gap-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg flex-1 transition"
                      onClick={() => handleEditar(p)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex-1 transition"
                      onClick={() => handleExcluir(p.id)}
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
