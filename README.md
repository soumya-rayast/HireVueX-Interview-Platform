# ✨ Video Calling Interview Platform ✨  


## 🚀 Overview  

A modern video calling platform designed for technical interviews. It enables interviewers to conduct live coding sessions, leave comments, and review recorded meetings.  

## 🔥 Features  

- 🎥 **Seamless Video Calls**  
- 🖥️ **Screen Sharing for Collaboration**  
- 🎬 **Screen Recording for Review**  
- 🔒 **Secure Authentication & Authorization** (Clerk)  
- 💻 **Server & Client Components**  
- 🛣️ **Dynamic & Static Routing** (Next.js)  
- 🎨 **Modern UI with Tailwind & Shadcn**  
- ✨ **Optimized with Server Actions**  

## 🏗️ Tech Stack  

- **Frontend:** Next.js, TypeScript, Tailwind, Shadcn  
- **Backend:** Convex, Stream, Clerk  
- **Authentication:** Clerk  
- **Video & Chat Services:** Stream  
- **Database & Storage:** Convex  

## ⚙️ Setup  

### 1️⃣ Configure Environment Variables  

Create a `.env` file in the root directory and add the following:  

```ini
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

### 2️⃣ Install Dependencies  

Run the following command to install required packages:  

```bash
npm install
```

### 3️⃣ Start the Application  

To launch the app in development mode, use:  

```bash
npm run dev
```

The app will be available at **`http://localhost:3000`**.  

---
