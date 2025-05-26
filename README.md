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
git clone https://github.com/seffy/yeson8-cdrm.git
cd yeson8-cdrm
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
PORT=8080
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
http://localhost:8080
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
