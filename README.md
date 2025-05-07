
```
taskpilot
├─ app
│  ├─ controllers
│  │  ├─ adminController.js
│  │  ├─ authController.js
│  │  ├─ homeController.js
│  │  └─ manageUsersController.js
│  ├─ middlewares
│  │  ├─ accessControl.js
│  │  └─ uploadMiddleware.js
│  ├─ models
│  │  ├─ Department.js
│  │  └─ User.js
│  ├─ modules
│  │  ├─ cloudContent
│  │  │  ├─ controllers
│  │  │  │  ├─ allRequestsController.js
│  │  │  │  ├─ contentController.js
│  │  │  │  ├─ mainContentController.js
│  │  │  │  └─ myRequestsController.js
│  │  │  ├─ middlewares
│  │  │  │  └─ accessControl.js
│  │  │  ├─ models
│  │  │  │  ├─ ContentRequest.js
│  │  │  │  └─ RequestType.js
│  │  │  ├─ routes
│  │  │  │  ├─ allRequests.js
│  │  │  │  ├─ content.js
│  │  │  │  ├─ mainContent.js
│  │  │  │  └─ myRequests.js
│  │  │  └─ views
│  │  └─ toolsAccess
│  │     ├─ controllers
│  │     ├─ models
│  │     ├─ routes
│  │     └─ views
│  └─ routes
│     ├─ admin.js
│     ├─ auth.js
│     ├─ home.js
│     ├─ manageUsers.js
│     └─ secureDownload.js
├─ app.js
├─ config
│  └─ db.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ styles.css
│  │  └─ views.css
│  ├─ img
│  │  ├─ access.svg
│  │  ├─ admin.svg
│  │  ├─ bg-1.jpg
│  │  ├─ bg-2.jpg
│  │  ├─ cm.svg
│  │  ├─ content-2.svg
│  │  ├─ content.svg
│  │  ├─ cube.svg
│  │  └─ logo.svg
│  └─ js
│     └─ scripts.js
├─ seedDepartments.js
├─ seedTools.js
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
   │  ├─ mainContentPage.ejs
   │  ├─ myRequests.ejs
   │  └─ updateRequest.ejs
   ├─ dashboard
   │  └─ home.ejs
   └─ toolsAccess

```