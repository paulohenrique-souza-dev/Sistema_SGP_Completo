# 🚀 Sistema SGP Completo

Guia rápido e objetivo para rodar o sistema **em qualquer computador**.

---

## 🧰 Pré-requisitos (instalar antes de tudo)

Para rodar o projeto completo, você precisa:

- **Git** → https://git-scm.com  
- **Java JDK 17+** → https://adoptium.net  
- **Maven 3.6+**  
- **Node.js 16+** (já vem com npm)  
- **PostgreSQL 14+** ou **Docker Desktop**  
- **16 GB de RAM ou mais** (para rodar Docker + serviços sem travar)

---

## 📥 Clonando o Repositório

Abra o terminal e execute:

```bash
git clone https://github.com/paulohenrique-souza-dev/Sistema_SGP_Completo.git
cd Sistema_SGP_Completo
Após isso você já estará dentro da pasta do projeto com todos os arquivos.

📦 Instalação das Dependências
O projeto possui Backend (Spring Boot) e Frontend (React).
Antes de rodar, instale as dependências de cada parte:

🔧 Backend – Spring Boot
cd backend
mvn clean install

🎨 Frontend – React
cd frontend
npm install
🐘 Banco de Dados
Criei a estrutura do banco e API conforme a necessidade do meu sistema,
mas você pode alterar como desejar.

⚠️ IMPORTANTE:
Os dados do banco estão visíveis nos arquivos (application.properties, docker-compose.yml)
porque este é um projeto pessoal e isso facilita quem quer testar.
 Testando Antes de Rodar Tudo
Antes de subir todos os serviços juntos:

1️⃣ Teste o banco de dados
Verifique se o PostgreSQL ou Docker está funcionando.

2️⃣ Teste a API

cd backend
mvn spring-boot:run

Se abrir em:
http://localhost:8080
então está ok.

3️⃣ Teste o Front

cd frontend
npm start
Se abrir em:
http://localhost:5173
então está ok.

🐳 Subindo Tudo com Docker (Recomendado)
Com tudo configurado e testado, você pode iniciar todos os serviços de uma vez:
Digite:

docker compose up --build
Isso irá rodar:
PostgreSQL,Backend e Frontend

Após iniciar, basta acessar e utilizar o sistema.


Muito obrigado por ler até aqui 🙌
Qualquer dúvida estou à disposição — até a próxima!
