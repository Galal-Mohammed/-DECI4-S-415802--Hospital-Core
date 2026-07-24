# -DECI4-S-415802--Hospital-Core
Cloud-Native Healthcare Management System
# 🏥 Cloud-Native Healthcare Management System

## Overview

The **Cloud-Native Healthcare Management System** is a full-stack hospital management platform designed using modern cloud-native architecture. The application enables healthcare staff to manage patients, appointments, and medical records through a responsive React interface backed by a Node.js/Express REST API and MongoDB database.

The project follows a **mono-repository architecture** and demonstrates modern software engineering practices including containerization, microservices, Docker Compose orchestration, Kubernetes manifests, automated database seeding, and GitHub version control.

---

# Project Repository

Repository:

https://github.com/Galal-Mohammed/-DECI4-S-415802--Hospital-Core

---

# Technologies Used

## Frontend

* React.js
* React Router
* Axios
* CSS

## Backend

* Node.js
* Express.js
* JWT Authentication
* MVC Architecture

## Database

* MongoDB

## DevOps

* Docker
* Docker Compose
* Kubernetes (Minikube)
* Git
* GitHub

---

# Project Structure

```
Hospital-Core
│
├── frontend/
│
├── backend/
│
├── microservices/
│   └── appointment-service/
│
├── infra/
│   ├── docker/
│   └── kubernetes/
│
├── docker-compose.yml
│
└── README.md
```

---

# Main Features

## Authentication

* Secure Login
* JWT Authentication
* Role-based Access

---

## Dashboard

* Hospital statistics
* Patient count
* Appointment count
* Doctor overview

---

## Patient Management

* Add Patient
* Edit Patient
* Delete Patient
* View Patient Details

---

## Appointment Management

* Book Appointment
* Update Appointment
* Delete Appointment
* Appointment Microservice

---

## Medical Records

* Create Medical Record
* Update Record
* View Patient History

---

# Architecture

```
                User
                  │
                  ▼
        React Frontend
                  │
                  ▼
          Express Backend
          │             │
          ▼             ▼
      MongoDB    Appointment Service
```

---

# Docker Architecture

```
Docker Compose

Frontend Container
        │
Backend Container
        │
MongoDB Container
        │
Appointment Service Container
```

---

# Kubernetes

The project includes Kubernetes manifests located in:

```
infra/kubernetes/
```

Example resources:

* backend-deployment.yaml
* backend-service.yaml
* frontend-deployment.yaml
* frontend-service.yaml
* mongo-deployment.yaml
* mongo-service.yaml
* ingress.yaml

---

# Running the Project

## Clone

```bash
git clone https://github.com/Galal-Mohammed/-DECI4-S-415802--Hospital-Core.git
```

---

## Docker

```bash
docker compose up --build
```

---

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

MongoDB

```
mongodb://localhost:27017
```

Appointment Service

```
http://localhost:5001
```

---

# Environment Variables

Backend (.env)

```
PORT=5000

JWT_SECRET=your_secret

MONGO_URI=mongodb://mongo:27017/healthcare
```

Appointment Service

```
PORT=5001

MONGO_URI=mongodb://mongo:27017/healthcare
```

---

# API Endpoints

## Authentication

POST

```
/api/auth/login
```

---

## Patients

GET

```
/api/patients
```

POST

```
/api/patients
```

PUT

```
/api/patients/:id
```

DELETE

```
/api/patients/:id
```

---

## Doctors

GET

```
/api/doctors
```

POST

```
/api/doctors
```

---

## Medical Records

GET

```
/api/medical-records
```

POST

```
/api/medical-records
```

---

## Dashboard

GET

```
/api/dashboard
```

---

## Appointment Service

GET

```
/appointments
```

POST

```
/appointments
```

PUT

```
/appointments/:id
```

DELETE

```
/appointments/:id
```

---

# Database Seeding

Run:

```bash
node seed.js
```

This script inserts sample:

* Patients
* Appointments
* Medical Records

---

# Testing

The project is prepared for:

* Unit Testing
* API Integration Testing
* End-to-End Testing

---

# CI/CD

GitHub Actions workflow can be configured to automatically:

* Install dependencies
* Run tests
* Build frontend
* Build backend

---

# Screenshots

Include screenshots of:

* Login
* Dashboard
* Patients
* Doctors
* Medical Records
* Appointments
* Docker Compose
* Kubernetes

---

# Future Improvements

* MongoDB Atlas Deployment
* Netlify Frontend Deployment
* Vercel Backend Deployment
* Lighthouse CI
* Horizontal Pod Autoscaling
* TLS Ingress
* React Query Cache
* Optimistic UI Updates

---

# Author

Galal Mohammed

Healthcare Management System

DECI Level 5 Final Project
