import { useEffect, useState } from "react";
import { getVendas, getProdutos, getClientes, criarVenda } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    clienteId: "",
    produtoId: "",
    quantidade: 1,
    dataVenda: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const [v, p, c] = await Promise.all([getVendas(), getProdutos(), getClientes()]);
      setVendas(v);
      setProdutos(p);
      setClientes(c);
    } catch {
      toast.error("❌ Erro ao carregar dados!");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.clienteId || !form.produtoId) {
      toast.error("Selecione cliente e produto!");
      return;
    }

    const produtoSelecionado = produtos.find(p => p.id === form.produtoId);
    const clienteSelecionado = clientes.find(c => c.id === form.clienteId);

    const vendaPayload = {
      cliente: clienteSelecionado,
      produto: produtoSelecionado,
      quantidade: parseInt(form.quantidade),
      valorTotal: parseInt(form.quantidade) * (produtoSelecionado.preco || 0),
      dataVenda: new Date(form.dataVenda).toISOString(),
    };

    try {
      await criarVenda(vendaPayload);
      toast.success("✅ Venda registrada!");
      setForm({
        clienteId: "",
        produtoId: "",
        quantidade: 1,
        dataVenda: new Date().toISOString().slice(0, 10)
      });
      carregarDados();
    } catch {
      toast.error("❌ Erro ao registrar venda!");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2500} />

      <h1 className="text-4xl font-extrabold text-cyan-600 mb-6">💰 Vendas</h1>

      {/* Formulário */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-600 mb-4">➕ Registrar Venda</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Cliente</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.clienteId}
              onChange={e => setForm({ ...form, clienteId: e.target.value })}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Produto</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.produtoId}
              onChange={e => setForm({ ...form, produtoId: e.target.value })}
            >
              <option value="">Selecione um produto</option>
              {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco.toFixed(2)}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Quantidade</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.quantidade}
              onChange={e => setForm({ ...form, quantidade: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Data da Venda</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.dataVenda}
              onChange={e => setForm({ ...form, dataVenda: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg font-semibold w-full"
          >
            Registrar Venda
          </button>
        </form>
      </div>

      {/* Lista de Vendas */}
      {loading ? (
        <p>Carregando vendas...</p>
      ) : vendas.length === 0 ? (
        <p>Nenhuma venda registrada.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-cyan-100">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">Cliente</th>
                <th className="px-4 py-2 border-b border-gray-300">Produto</th>
                <th className="px-4 py-2 border-b border-gray-300">Quantidade</th>
                <th className="px-4 py-2 border-b border-gray-300">Valor Total</th>
                <th className="px-4 py-2 border-b border-gray-300">Data</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map(v => (
                <tr key={v.id} className="hover:bg-cyan-50 transition-all">
                  <td className="px-4 py-2 border-b border-gray-200">{v.cliente?.nome}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{v.produto?.nome}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{v.quantidade}</td>
                  <td className="px-4 py-2 border-b border-gray-200">R$ {v.valorTotal?.toLocaleString("pt-BR")}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{new Date(v.dataVenda).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
