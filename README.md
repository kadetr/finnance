# Finnance & Candlesticks

## 1. Overview

this project is built to gather finnhub stock data, store it, process it, and display it to user.

frontend developped with react, typescript.

- validation: react-hook-form
- linting: eslint
- state management: redux toolkit
- style/css: material ui
- chart: google-react-charts

backend developped with node, express, postgres, typescript.

- orm: prisma
- database: postgres
- cryptography: bcryptjs
- token: jsonwebtoken
- web socket: ws
- linting: eslint
- unit testing: jest

## 2. Installation/Configuration

node 18 - npm 10 should be installed on the system. [nvm](https://github.com/nvm-sh/nvm) can be used to manage node versions. docker daemon&cli should be installed and running. [docker desktop](https://www.docker.com/products/docker-desktop/) also runs daemon.

### 2.1 Shell Script (config.sh)

```bash
git clone https://github.com/kadetr/finnance.git && cd finnance
```

change '.env.example' to '.env' in backend&frontend

run the `config.sh` script to handle dependencies

```shell
chmod +x config.sh
./config.sh
```

### 2.2 Manual Setup

#### a. Frontend

- installing dependencies

```bash
cd frontend
$ npm install
```

- setting .env file (environment variables)

| ENV VAR NAME        | Description                   | Default                 |
| ------------------- | ----------------------------- | ----------------------- |
| `REACT_APP_API_URL` | backend url for http requests | `http://localhost:8008` |

- running frontend

```bash
$ npm start
```

access localhost:3000 via browser

#### b. Backend

- installing dependencies

```bash
cd backend
$ npm install
```

- setting .env file (environment variables)

| ENV VAR NAME      | Description                      | Default                                                 |
| ----------------- | -------------------------------- | ------------------------------------------------------- |
| `DATABASE_URL`    | url used to connect to database. | `postgresql://c0nd0:p4ssw0rd@localhost:5432/finnanceDB` |
| `JWT_SECRET`      | json web token key.              | `c0nd0s3cr3t`                                           |
| `PORT`            | port for http connections.       | 8008                                                    |
| `WS_PORT`         | port for websocket connections.  | 8080                                                    |
| `FINNHUB_API_KEY` | finnhub api key                  | n/a (obtain via finnhub)                                |

- database configuration

if there is no postgres server running locally, backend/docker-compose.yml file can be used to create&run a postgres image. this can be done with:

```bash
cd backend
docker compose up -d
```

- prisma configuration

if DATABASE_URL is correct, running the following script will create finnanceDB with 3 tables: user, trade, candlestick

```bash
npx prisma migrate dev --name init
```

- running backend

```bash
npm run start:dev
```

register a user. choose display option: "symbol" or "candlestick". dont forget to click "submit".

viola!

## 3. Structure

### Frontend

frontend has folders under _src_:

- _components_ contains resuable or modular react functions. search bars, authentication forms, websocket table, header

- _screens_ provides user interfaces and control logics. 4 screens are: register, login, live Symbol, home (candlestick chart). screens dispatch actions (http requests - axios) using store/features.

- _store_ is for state management implemented via redux toolkit. authentication and candlestick states managed through store.

- _types_ keeps data types and sample data.

### Backend

backend contains prisma, src, tests folder.

- _prisma_ contains database schema, prisma client instance.

- _src_ keeps server code in controllers, models, routes, services, sockets and utils.

- _stc/models_ used in services and websockets, defines data models.

- _src/controllers_ get requests from the _routes_ and run the necessary _src/services_.

- _src/sockets_ defines 2 websockets, one for finnhub connection to store stock symbols via websocket, one for symbol live data endpoint to frontend.

- symbol live data endpoint fetches data from database and send it to user every 5 seconds. for simplicity, it sends 5 symbol data and frontend takes first one from array to display to user. Some sort of processing/analysis (average, median, candlestick, etc) can be implemented before sending data to frontend. Due to time constraints, this interface kept simple.

## 4. Important Notes

- live symbol websocket state logic handled in symbolscreen and not moved to store due to time constraints. resource for redux toolkit-websocket can be found [here](https://www.taniarascia.com/websockets-in-redux/).

- on assignment document **This is essentially the very same data received from Finhub.** is written. This was lately noticed by the author, thus not implemented. a message queue like rabbitmq could be implemented to push the data from finnhub websocket data to symbol live data websocket. This would also optimize server-database communication.

- eslint removed from frontend due to configuration/installation issues (nodejs version 16 vs 18).

- in order to display the changes rapidly, candlestick duration window is set to _1 minute_. changes can be made in `candlestick.service.ts` and `server.ts`. additionally, a secondary candlestick table can be created via prisma to seperate 1-minute windows data and 1-hour window data.

## 5. Future Work

Besides items mentioned in previous section, following to be implemented as a future work:

- containerize full app. (only database now, prisma migrations require additional steps)

- testing to be improved (integration tests,end-to-end tests). also, security, performance tests to be implemented.

- candlestick window duration selection to be implemented. (1-minute, 30-minute, 1-hour, 1-day)

- concepts like load balancing, caching, indexing, batch process to be implemented for non-functional requirements like performance, availability, scalability (based on requirements).

- bonus tasks were not clear to author. more input needed in order to complete the tasks.
