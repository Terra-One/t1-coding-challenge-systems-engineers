# Terra One Coding Challenge for System Engineers

## Overview

This project demonstrates a real-time, distributed microservices architecture using Kafka and MongoDB. The system consists of four microservices:

- **calculation-service**: Calculates profit/loss based on market and trade data.
- **frontend-service**: Serves API endpoints and streams profit/loss data to the frontend.
- **kafka-producer**: Ingests and streams market and trade data into Kafka topics.
- **frontend**: A web UI for visualizing the results.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for Kafka and MongoDB)
- [MongoDB Compass](https://www.mongodb.com/products/compass) or [Robo 3T](https://robomongo.org/) (optional, for DB inspection)

---

## Setup Instructions

### 1. **Clone the Repository**

```sh
git clone <your-fork-url>
cd t1-coding-challenge-systems-engineers
```

### 2. **Start Infrastructure (Kafka & MongoDB)**

```sh
docker-compose up -d
```

This will start Kafka, Zookeeper, and MongoDB containers.

### 3. **Create Kafka Topics**

```sh
sh kafka-setup.sh
```
or run the commands inside `kafka-setup.sh` manually if on Windows.

### 4. **Install Dependencies for All Services**

```sh
npm install --workspaces
```
Or, for each service:
```sh
cd calculation-service && npm install
cd ../frontend-service && npm install
cd ../kafka-producer && npm install
cd ../frontend && npm install
```

### 5. **Start Microservices**

Open four terminals (one for each service):

**Terminal 1: calculation-service**
```sh
cd calculation-service
npm start
```

**Terminal 2: frontend-service**
```sh
cd frontend-service
npm start
```

**Terminal 3: kafka-producer**
```sh
cd kafka-producer
npm start
```

**Terminal 4: frontend**
```sh
cd frontend
npm start
```

---

## Usage & Testing

1. **Kafka Producer** will stream market and trade data into Kafka topics.
2. **Calculation Service** will consume these topics, calculate profit/loss, and store results in MongoDB.
3. **Frontend Service** will fetch profit/loss data from MongoDB and provide it via API.
4. **Frontend** (UI) is available at [http://localhost:3000](http://localhost:3000) for visualization.

### API Testing

- You can test the API endpoints exposed by `frontend-service` using:
  ```sh
  curl http://localhost:3001/open-position
  curl http://localhost:3001/pnl
  ```
  (Replace endpoints as needed.)

### Database Inspection

- Use MongoDB Compass or Robo 3T to connect to `mongodb://localhost:27017/profitdb` and inspect the `results` collection.

---

## Development Notes
- Each microservice is independent and can be scaled horizontally.
- Kafka consumer groups ensure each message is processed only once by one instance of a service.

---

## Troubleshooting

- Ensure Docker containers for Kafka and MongoDB are running.
- If you encounter port conflicts, adjust the ports in `docker-compose.yml`.
- Check each service's logs for errors if data is not flowing as expected.

---