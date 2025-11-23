import { useState } from "react";

export default function ClienteForm({ cliente, fechar, atualizarLista }) {
  const API_URL = "http://localhost:8080/api/clientes";

  const [form, setForm] = useState({
    nome: cliente?.nome || "",
    email: cliente?.email || "",
    telefone: cliente?.telefone || "",
    endereco: cliente?.endereco || {
      rua: "",
      numero: "",
      cidade: "",
      estado: "",
      cep: ""
    }
  });

  function atualizarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function atualizarEndereco(campo, valor) {
    setForm({
      ...form,
      endereco: { ...form.endereco, [campo]: valor }
    });
  }

  async function salvar(e) {
    e.preventDefault();

    const metodo = cliente ? "PUT" : "POST";
    const url = cliente ? `${API_URL}/${cliente.id}` : API_URL;

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
          {cliente ? "Editar Cliente" : "Novo Cliente"}
        </h2>

        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded w-full mb-3"
          value={form.nome}
          onChange={e => atualizarCampo("nome", e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={form.email}
          onChange={e => atualizarCampo("email", e.target.value)}
        />

        <input
          type="text"
          placeholder="Telefone"
          className="border p-2 rounded w-full mb-3"
          value={form.telefone}
          onChange={e => atualizarCampo("telefone", e.target.value)}
        />

        <h3 className="text-lg font-semibold mt-2 mb-1">Endereço</h3>

        <input
          type="text"
          placeholder="Rua"
          className="border p-2 rounded w-full mb-2"
          value={form.endereco.rua}
          onChange={e => atualizarEndereco("rua", e.target.value)}
        />

        <input
          type="text"
          placeholder="Número"
          className="border p-2 rounded w-full mb-2"
          value={form.endereco.numero}
          onChange={e => atualizarEndereco("numero", e.target.value)}
        />

        <input
          type="text"
          placeholder="Cidade"
          className="border p-2 rounded w-full mb-2"
          value={form.endereco.cidade}
          onChange={e => atualizarEndereco("cidade", e.target.value)}
        />

        <input
          type="text"
          placeholder="Estado"
          className="border p-2 rounded w-full mb-2"
          value={form.endereco.estado}
          onChange={e => atualizarEndereco("estado", e.target.value)}
        />

        <input
          type="text"
          placeholder="CEP"
          className="border p-2 rounded w-full mb-2"
          value={form.endereco.cep}
          onChange={e => atualizarEndereco("cep", e.target.value)}
        />

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
