# Como Executar o Projeto:

### 1. Clonar o Repositório
```bash
git clone [https://github.com/yanoliveira-ops/cloud-air_project.git](https://github.com/yanoliveira-ops/cloud-air_project.git)
cd cloud-air_project/api
```
### 2. Instalar as Dependências
```bash
npm install
```
### 3. Configurar o Banco de Dados (PostgreSQL)
Abra o pgAdmin ou terminal PostgreSQL local e execute o script contido em database/setup.sql para criar a tabela ( tb_telemetria ).

### 4. Configurar as Variáveis de Ambiente
Crie um ficheiro .env na pasta api/ com as credenciais locais:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sua_senha_local
DB_NAME=cloud_air_db
DB_PORT=5432
```

### 5. Iniciar o Servidor
```bash
node server.js
# ou
npm run dev
```
