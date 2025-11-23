const API_URL = "http://localhost:8080/api";

// ================== PRODUTOS ==================
export async function getProdutos() {
  const res = await fetch(`${API_URL}/produtos`);
  return res.json();
}

export async function criarProduto(data) {
  const res = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function atualizarProduto(id, data) {
  const res = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function excluirProduto(id) {
  await fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" });
}

// ================== CLIENTES ==================
export async function getClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  return res.json();
}

export async function criarCliente(data) {
  const res = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function atualizarCliente(id, data) {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function excluirCliente(id) {
  await fetch(`${API_URL}/clientes/${id}`, { method: "DELETE" });
}

// ================== VENDAS ==================
export async function getVendas() {
  const res = await fetch(`${API_URL}/vendas`);
  return res.json();
}

export async function criarVenda(data) {
  const res = await fetch(`${API_URL}/vendas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function atualizarVenda(id, data) {
  const res = await fetch(`${API_URL}/vendas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function excluirVenda(id) {
  await fetch(`${API_URL}/vendas/${id}`, { method: "DELETE" });
}
