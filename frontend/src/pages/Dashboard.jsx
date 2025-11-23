// Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getVendas, getClientes, getProdutos } from "../services/api";

/* ========================= CONFIGURAÇÕES ========================= */

// Taxa dólar
const TAXA_DOLAR = 5.7;

// Funções de moeda corrigidas
const formatBRL = (v) =>
  Number(v || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

const formatUSD = (v) =>
  Number(v || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

const moeda = (v, isDolar) =>
  isDolar ? formatUSD(v / TAXA_DOLAR) : formatBRL(v);

/* cor para as bolhas do mapa */
function getCorMapa(valor) {
  if (!valor || valor <= 0) return "#93c5fd";
  if (valor < 1000) return "#3b82f6";
  if (valor < 5000) return "#f97316";
  return "#ef4444";
}

/* cor dinâmica HSL */
function corFaturamentoHSL(valor, min, max) {
  const intensidade = max === min ? 0 : (valor - min) / (max - min);
  const lightness = 80 - intensidade * 50;
  return `hsl(220, 75%, ${lightness}%)`;
}

/* ========================= COMPONENTES ========================= */

function Avatar({ name }) {
  const letter = (name || "?").charAt(0).toUpperCase();
  return (
    <div className="h-10 w-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">
      {letter}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function GraphCard({ title, children, height = "h-72" }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className={height}>{children}</div>
    </div>
  );
}

/* ========================= DASHBOARD ========================= */

export default function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [marcaFilter, setMarcaFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [moedaDolar, setMoedaDolar] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [prod, cli, vend] = await Promise.all([
          getProdutos(),
          getClientes(),
          getVendas(),
        ]);
        setProdutos(prod || []);
        setClientes(cli || []);
        setVendas(vend || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6">Carregando...</div>;

  /* ================= FATURAMENTO MENSAL ================== */

  const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov"];
  const fatMes = {};

  vendas.forEach((v) => {
    if (!v.dataVenda) return;
    const mes = new Date(v.dataVenda)
      .toLocaleString("pt-BR", { month: "short" })
      .replace(".", "")
      .toLowerCase();
    fatMes[mes] = (fatMes[mes] || 0) + (v.valorTotal || 0);
  });

  const valoresMes = meses.map((m) => fatMes[m] || 0);
  const minMes = Math.min(...valoresMes);
  const maxMes = Math.max(...valoresMes);

  const dadosFaturamento = meses.map((m) => ({
    mes: m.toUpperCase(),
    valor: moedaDolar
      ? Number((fatMes[m] || 0) / TAXA_DOLAR).toFixed(2)
      : Number(fatMes[m] || 0),
    raw: fatMes[m] || 0,
  }));

  /* ================= TOP CLIENTES ================= */
  const totClientes = {};
  vendas.forEach((v) => {
    const nome = v.cliente?.nome;
    if (!nome) return;
    totClientes[nome] = (totClientes[nome] || 0) + (v.valorTotal || 0);
  });

  const dadosClientes = Object.entries(totClientes)
    .map(([nome, valor]) => ({ nome, valor }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 3);

  /* ================= TOP PRODUTOS ================= */
  const totProdutos = {};
  vendas.forEach((v) => {
    const nome = v.produto?.nome || "Indefinido";
    totProdutos[nome] = (totProdutos[nome] || 0) + (v.quantidade || 0);
  });

  const dadosProdutos = Object.entries(totProdutos)
    .map(([nome, qtd]) => ({ nome, qtd }))
    .sort((a, b) => b.qtd - a.qtd)
    .slice(0, 5);

  /* ================= MARCAS ================= */
  const vendasFiltradasPorMarca = marcaFilter
    ? vendas.filter((v) => v.produto?.marca?.nome === marcaFilter)
    : vendas;

  const totMarca = {};
  vendasFiltradasPorMarca.forEach((v) => {
    const m = v.produto?.marca?.nome || "Indefinida";
    totMarca[m] = (totMarca[m] || 0) + (v.quantidade || 0);
  });

  const dadosMarcas = Object.entries(totMarca)
    .map(([marca, qtd]) => ({ marca, qtd }))
    .sort((a, b) => b.qtd - a.qtd)
    .slice(0, 10);

  /* ================= MAPA ================= */
  const vendasEstado = {};
  clientes.forEach((c) => {
    const est = c.cidade || "Indefinido";
    const total = vendas
      .filter((v) => v.cliente?.id === c.id)
      .reduce((t, v) => t + (v.valorTotal || 0), 0);

    vendasEstado[est] = (vendasEstado[est] || 0) + total;
  });

  const coordsEstados = {
    Acre: [-8.77, -70.55],
    Alagoas: [-9.62, -36.82],
    Amapá: [1.41, -51.77],
    Amazonas: [-4, -63],
    Bahia: [-12.97, -38.51],
    Ceará: [-3.73, -38.53],
    "Distrito Federal": [-15.79, -47.87],
    "Espírito Santo": [-20.31, -40.34],
    Goiás: [-16.64, -49.31],
    Maranhão: [-2.55, -44.3],
    "Mato Grosso": [-12.64, -55.42],
    "Mato Grosso do Sul": [-20.51, -54.54],
    "Minas Gerais": [-19.92, -43.94],
    Pará: [-5.53, -52.29],
    Paraíba: [-7.24, -36.83],
    Paraná: [-25.44, -49.3],
    Pernambuco: [-8.28, -35.07],
    Piauí: [-7.53, -42.78],
    "Rio de Janeiro": [-22.91, -43.17],
    "Rio Grande do Norte": [-5.22, -36.52],
    "Rio Grande do Sul": [-30.03, -51.23],
    Rondônia: [-11.22, -62.8],
    Roraima: [2.89, -60.69],
    "Santa Catarina": [-27.33, -49.44],
    "São Paulo": [-23.55, -46.63],
    Sergipe: [-10.9, -37.07],
    Tocantins: [-10.25, -48.25],
    Indefinido: [-15, -55],
  };

  const estadosDisponiveis = Object.keys(vendasEstado).filter(
    (k) => vendasEstado[k] > 0
  );

  const estadosParaRender = estadoFilter
    ? estadosDisponiveis.filter((e) => e === estadoFilter)
    : estadosDisponiveis;

  /* =================== RENDER =================== */

  const totalVendido = vendas.reduce((t, v) => t + (v.valorTotal || 0), 0);

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* TOP CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Vendas" value={vendas.length} />
        <Card title="Produtos Registrados" value={produtos.length} />
        <Card title="Clientes Ativos" value={clientes.length} />

        <Card
          title={
            <button onClick={() => setMoedaDolar(!moedaDolar)}>
              💵 Faturamento ({moedaDolar ? "USD" : "BRL"})
            </button>
          }
          value={moeda(totalVendido, moedaDolar)}
        />
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-2 gap-6">
        {/* FATURAMENTO MENSAL BARRAS */}
        <GraphCard title={`📊 Faturamento Mensal (${new Date().getFullYear()})`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosFaturamento}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                formatter={(v) => (moedaDolar ? formatUSD(v) : formatBRL(v))}
              />
              <Bar dataKey="valor">
                {dadosFaturamento.map((d, i) => (
                  <Cell
                    key={i}
                    fill={corFaturamentoHSL(d.raw, minMes, maxMes)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GraphCard>

        {/* LINHA */}
        <GraphCard title="📈 Faturamento Mensal (Gráfico de Linha)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dadosFaturamento}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                formatter={(v) => (moedaDolar ? formatUSD(v) : formatBRL(v))}
              />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphCard>

        {/* TOP PRODUTOS */}
        <GraphCard title="🏆 Top Produtos Mais Vendidos">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={dadosProdutos}>
              <XAxis type="number" domain={[0, (dataMax) => dataMax + 20]} />
              <YAxis type="category" dataKey="nome" width={180} />
              <Tooltip />
              <Bar dataKey="qtd" fill="#4f46e5">
                <LabelList dataKey="qtd" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GraphCard>

        {/* TOP CLIENTES */}
        <GraphCard title="🏆 Top 3 Clientes ">
          <div className="space-y-4">
            {dadosClientes.map((c, idx) => (
              <div
                key={c.nome}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={c.nome} />
                  <div>
                    <p className="text-lg font-semibold">{c.nome}</p>
                    <p className="text-xs text-gray-500">Cliente</p>
                  </div>
                </div>

                <div className="text-3xl">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    {moeda(c.valor, moedaDolar)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {
                      vendas.filter((v) => v.cliente?.nome === c.nome).length
                    }{" "}
                    vendas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GraphCard>

        {/* MAPA */}
        <GraphCard title="🌎 Vendas por Estado (Brasil)" height="h-[560px]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Filtrar estado:</label>
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="">Todos</option>
                {estadosDisponiveis.sort().map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[460px]">
            <MapContainer
              center={[-14.2, -53.9]}
              zoom={4.2}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {estadosParaRender.map((estado) => {
                const valor = vendasEstado[estado] || 0;
                const center =
                  coordsEstados[estado] || coordsEstados["Indefinido"];
                const raio = Math.sqrt(valor || 1) * 180;
                const cor = getCorMapa(valor);

                return (
                  <Circle
                    key={estado}
                    center={center}
                    radius={raio}
                    color={cor}
                    fillColor={cor}
                    fillOpacity={0.45}
                    stroke={false}
                  >
                    <Popup>
                      <strong>{estado}</strong>
                      <br />
                      {moeda(valor, moedaDolar)}
                      <br />
                      {valor > 0 && <span>Raio: {Math.round(raio)}</span>}
                    </Popup>
                  </Circle>
                );
              })}
            </MapContainer>
          </div>
        </GraphCard>

        {/* MARCAS */}
        <GraphCard title="📊Marcas Mais Vendidas">
          <div className="mb-3 flex items-center gap-3">
            <label className="text-sm text-gray-600">Filtrar marca:</label>
            <select
              value={marcaFilter}
              onChange={(e) => setMarcaFilter(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">Todas as marcas</option>
              {Array.from(
                new Set(
                  vendas
                    .map((v) => v.produto?.marca?.nome)
                    .filter(Boolean)
                )
              ).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={dadosMarcas}>
              <XAxis type="number" domain={[0, (dataMax) => dataMax + 20]} />
              <YAxis type="category" dataKey="marca" width={150} />
              <Tooltip />
              <Bar dataKey="qtd" fill="#16a34a">
                <LabelList dataKey="qtd" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GraphCard>
      </div>
    </div>
  );
}
