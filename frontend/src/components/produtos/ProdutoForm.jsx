import { useState } from "react";

export default function ProdutoForm({ produto, fechar, atualizarLista }) {
  const API_URL = "http://localhost:8080/api/produtos";

  const [form, setForm] = useState({
    nome: produto?.nome || "",
    preco: produto?.preco || "",
    estoque: produto?.estoque || "",
    categoria: produto?.categoria || { nome: "" },
    marca: produto?.marca || { nome: "" }
  });

  function atualizarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  async function salvar(e) {
    e.preventDefault();

    const metodo = produto ? "PUT" : "POST";
    const url = produto ? `${API_URL}/${produto.id}` : API_URL;

    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    atualizarLista();
    fechar();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={salvar}>
        <h2 className="text-xl font-bold mb-4">
          {produto ? "Editar Produto" : "Novo Produto"}
        </h2>

        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded w-full mb-3"
          value={form.nome}
          onChange={e => atualizarCampo("nome", e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          className="border p-2 rounded w-full mb-3"
          value={form.preco}
          onChange={e => atualizarCampo("preco", e.target.value)}
        />

        <input
          type="number"
          placeholder="Estoque"
          className="border p-2 rounded w-full mb-3"
          value={form.estoque}
          onChange={e => atualizarCampo("estoque", e.target.value)}
        />

        <input
          type="text"
          placeholder="Categoria"
          className="border p-2 rounded w-full mb-3"
          value={form.categoria?.nome}
          onChange={e =>
            setForm({ ...form, categoria: { nome: e.target.value } })
          }
        />

        <input
          type="text"
          placeholder="Marca"
          className="border p-2 rounded w-full mb-3"
          value={form.marca?.nome}
          onChange={e =>
            setForm({ ...form, marca: { nome: e.target.value } })
          }
        />

        {/* Ações */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={fechar}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
