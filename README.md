

# y!on8 Platform Overview

`y!on8` (formerly known as TaskPilot, and pronounced “yes, on it”) is a unified, modular, cloud-native platform designed to simplify and automate internal workflows across organizations. It enables teams to manage resource access, content requests, approvals, and operational tasks through scalable, role-based tools—all within a secure and centralized environment.

Each application within y!on8 is built and deployed as an independent microservice, allowing for enhanced scalability, maintainability, and flexibility. The platform integrates seamlessly using a shared frontend UI (EJS), connects to cloud-hosted MongoDB databases, and is deployed using Docker and Kubernetes—making it ideal for small to medium enterprises (SMEs) as well as growing teams.

Whether it’s submitting a content development request, requesting access to enterprise tools, or managing IT asset handovers, y!on8 provides a tailored suite of apps that align with real-world business processes and internal control standards.

---

## 🧩 Microservices Within y!on8

Each microservice has:
- Its own Node.js + Express backend
- A dedicated MongoDB Atlas database
- Independent deployment with Docker and Kubernetes
- Secrets and configuration managed via Kubernetes Secrets & ConfigMaps

| Microservice | Description |
|--------------|-------------|
| **Access Manager** | Allows users to request internal tool access, with approval workflow and admin controls. |
| **Training Request Manager** | Handles employee training/course requests and supervisor approval tracking. |
| **Content Request Development Manager** | Enables departments to request learning, media, or marketing content. |
| **Asset & Equipment Manager** | Manages IT asset checkout requests like laptops, monitors, etc. |
| **Software License Manager** | Tracks and handles requests for software licenses and renewals. |

---

# **y!on8** Content Development Request Manager

The **y!on8 Content Development Request Manager** is a core module within the **y!on8** platform.  
It enables employees to submit, track, and manage requests related to content creation — including instructional videos, eLearning materials, written content, and internal communication assets.

This application supports modular content workflows by allowing users to:
- Submit new content requests with auto-generated tracking IDs
- Assign requests to specific content creators or departments
- Track status updates (e.g., Outstanding, In Progress, Completed)
- Manage approvals and maintain transparent communication across teams

The module is built with a microservices mindset and deployed independently using Docker and Kubernetes. It leverages the shared UI layer of the y!on8 platform and stores all request data in MongoDB Atlas, with secure user authentication and access-level-based controls.

## 🎯 Ideal Use Case

This tool is ideal for:
- L&D teams requesting instructional materials
- HR teams submitting onboarding or compliance content
- Managers needing internal training resources
- Any department involved in recurring content creation

## 📋 Features
- User Authentication (Login/Logout)
- Access Control based on user level
- Submit Tool Access Requests
- Add Users and Add Tools (Level 3+ only)
- Dockerized Application
- Full Kubernetes Deployment with:
  - Deployment
  - Service
  - ConfigMap
  - Secret
  - Horizontal Pod Autoscaler (HPA)

---

# 🛠️ YesOnIt CDRM – Setup & Run Guide

Steps to clone, configure, and run the **YesOnIt Content Development Request Manager** project locally.

---

## 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/seffy/yesonit-cdrm.git
cd yesonit-cdrm
```

---

## 📦 Step 2: Install Dependencies

Make sure you have **Node.js (v16+)** and **npm** installed.

```bash
npm install
```

---

## 🔐 Step 3: Create a `.env` File

You’ll need to create a `.env` file in the root directory with the following content:

```env
PORT=3739
MONGO_URI=your-mongodb-atlas-uri
SESSION_SECRET=your-secret-key
```

> 🔒 Replace the values with your actual credentials.

---

## ▶️ Step 4: Run the Application

```bash
npm start
```

Visit the app in your browser at:

```
http://localhost:3739
```

---

## 🐳 Optional: Run with Docker (If Installed)

```bash
docker build -t yesonit-cdrm .
docker run -p 3739:3739 --env-file .env yesonit-cdrm
```

---

## 🧪 Testing & Development

You can test features such as:
- Logging in
- Submitting a request
- Viewing and updating submissions
- Admin features based on access level

---


## 📦 Project Structure - y!onit Content Development Request Manager


```
yesonit-cdrm
├─ .dockerignore
├─ Dockerfile
├─ README.md
├─ app
│  ├─ controllers
│  │  ├─ adminController.js
│  │  ├─ allRequestsController.js
│  │  ├─ authController copy.js
│  │  ├─ authController.js
│  │  ├─ authControllerx.js
│  │  ├─ contentController.js
│  │  ├─ homeController.js
│  │  ├─ mainContentController.js
│  │  ├─ manageUsersController.js
│  │  └─ myRequestsController.js
│  ├─ middlewares
│  │  ├─ accessControl.js
│  │  ├─ setUser.js
│  │  └─ uploadMiddleware.js
│  ├─ models
│  │  ├─ ContentRequest.js
│  │  ├─ Department.js
│  │  ├─ RequestType.js
│  │  └─ User.js
│  └─ routes
│     ├─ admin.js
│     ├─ allRequests.js
│     ├─ auth.js
│     ├─ content.js
│     ├─ home.js
│     ├─ mainContent.js
│     ├─ manageUsers.js
│     ├─ myRequests.js
│     └─ secureDownload.js
├─ app.js
├─ config
│  └─ db.js
├─ k8s
│  ├─ deployment.yaml
│  ├─ mongo-secret.yaml
│  └─ service.yaml
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  ├─ img
│  └─ js
├─ seedDepartments.js
└─ views
   ├─ admin
   │  ├─ admin.ejs
   │  ├─ editUser.ejs
   │  └─ manageUsers.ejs
   ├─ auth
   │  ├─ login-x.ejs
   │  ├─ login.ejs
   │  └─ register.ejs
   ├─ cloudContent
   │  ├─ allRequests.ejs
   │  ├─ contentForm.ejs
   │  ├─ mainContentPage-x.ejs
   │  ├─ mainContentPage.ejs
   │  ├─ myRequests.ejs
   │  └─ updateRequest.ejs
   ├─ dashboard
   │  └─ home.ejs
   └─ partials
      ├─ footer.ejs
      └─ header.ejs

```



--- 

## 🔐 Cloud-Native Stack

- **Frontend**: EJS templates rendered via Express
- **Backend**: Node.js + Express per service
- **Database**: MongoDB Atlas
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Secrets Management**: Kubernetes Secrets & ConfigMaps

---

This architecture ensures that y!on8 is scalable, modular, and ready for future microservice expansion.

