# 🧪 Experiment 6 — CI/CD Pipeline using Jenkins and Docker

## 🎯 Aim
To build and deploy a **microservices-based application** using **Jenkins** for CI/CD automation and **Docker** for containerization, thereby demonstrating continuous integration and continuous deployment in a DevOps pipeline.

---

## 🧠 Problem Statement
Modern software systems are often developed as **microservices** to improve modularity, scalability, and maintainability.  
However, manually building, testing, and deploying multiple services is error-prone and time-consuming.  

This experiment solves that problem by using **Jenkins pipelines** to automate the build and deployment process of microservices into Docker containers.

---

## ⚙️ Technologies Used
- **Jenkins** → Continuous Integration / Continuous Deployment (CI/CD)  
- **Docker & Docker Compose** → Containerization and service orchestration  
- **Node.js** → Microservices backend development  
- **GitHub** → Source code repository  
- **Docker Hub** → Container image registry  

---

## 🧩 Architecture Overview
This project consists of two simple Node.js microservices:
1. **User Service** → Handles user-related APIs (port 3001)
2. **Order Service** → Handles order-related APIs (port 3002)

Each service has:
- Its own `Dockerfile`
- Health endpoint for verification
- Packaged together using `docker-compose.yml`

---

## 🚀 CI/CD Pipeline Stages

| Stage | Description |
|--------|--------------|
| **1. Checkout Code** | Jenkins pulls the latest source code from GitHub |
| **2. Build Docker Images** | Builds images for User and Order microservices |
| **3. Push to Docker Hub** | Pushes built images to Docker Hub registry |
| **4. Deploy Containers** | Uses `docker-compose` to start both containers |
| **5. Verify Deployment** | Verifies both services via health endpoints |

---

## 🧰 Tools Configuration

### 🔹  Docker
Each microservice includes a `Dockerfile` defining its runtime image.  
Both services are deployed using `docker-compose.yml`.
