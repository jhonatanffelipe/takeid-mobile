# 📱 TakeID Mobile

## Como rodar o projeto

### Pré-requisitos
- **Node.js**: Versão **v24.11.0** (obrigatório)
- **npm** ou **yarn**
- **Expo**: Usar via `npx expo`
- Backend rodando: [https://github.com/jhonatanffelipe/takeid-backend.git](https://github.com/jhonatanffelipe/takeid-backend.git)

> ⚠️ Certifique-se de que o backend está rodando antes de iniciar o app mobile.

### Passos para rodar
1. Clone este repositório e o backend:
   ```bash
   git clone https://github.com/jhonatanffelipe/takeid-mobile.git
   git clone https://github.com/jhonatanffelipe/takeid-backend.git
   ```
2. Instale as dependências:
   ```bash
   cd takeid-mobile
   npm install
   ```
3. Não é necessário instalar o Expo CLI globalmente. Use o Expo via npx:
   ```bash
   npx expo start
   ```
4. Inicie o backend conforme instruções do repositório backend.
5. Inicie o app mobile:
   ```bash
   npx expo start
   ```
6. Use o app no seu dispositivo físico (recomendado) ou emulador. Escaneie o QR code com o app Expo Go.



### Configuração do .env

Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias para o funcionamento do app. Use como base o arquivo `.env-modelo` já presente no projeto:

```env
# Use a URL gerada pelo ngrok após rodar o comando:
# ngrok http 3007
EXPO_PUBLIC_API_URL_LOCAL=https://SUA-URL-NGROK.ngrok-free.app
```

> Substitua `https://SUA-URL-NGROK.ngrok-free.app` pela URL pública exibida pelo ngrok. Caso esteja rodando localmente sem ngrok, pode usar `http://localhost:3007`.

- `EXPO_PUBLIC_API_URL_LOCAL`: URL do backend

### Observações
- Certifique-se de que o backend está acessível pelo endereço configurado no arquivo `src/service/api.ts` ou pela variável de ambiente do `.env`.
- Caso utilize emulador, ajuste o IP do backend para o IP local da sua máquina.

---
Desenvolvido por Jhonatan Felipe
