<div align="center">

<img src="https://img.shields.io/badge/HRTechOpen-Problem%20%2310-4F46E5?style=for-the-badge&logoColor=white" />
<img src="https://img.shields.io/badge/Solo%20Build-24hrs-D97706?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase" />
<img src="https://img.shields.io/badge/Claude-AI-4F46E5?style=for-the-badge" />

<br/><br/>

# 🧵 HRTech — DayOne

### *The AI Onboarding Copilot that detects who's silently struggling — before they become an attrition statistic.*

<br/>

> **HRTechOpen Hackathon · Problem #10 · New Hire Onboarding Guide**

</div>

---

## 🧩 The Problem

> *"New employees joining a company often feel lost in the first few weeks because there is no proper guide or checklist to help them settle in."*

Every year, **20% of new hires quit within their first 90 days.** Replacing one employee costs ₹80,000–₹1.5 Lakh. Most of it is preventable.

But here's what nobody talks about:

- ❌ New hires don't ask questions — they're scared of looking incompetent in a new job
- ❌ HR assumes **silence = settled in** — it usually means the opposite
- ❌ No existing tool detects a struggling employee **until they hand in their notice**

Checklists, PDFs, and SharePoint pages exist everywhere. **What's missing is a real-time signal.**

---

## 💡 The Solution

**HRTech DayOne** is a two-sided onboarding intelligence platform:

| Side | What They Get |
|------|--------------|
| 🧑‍💼 **New Hire** | An AI chatbot that answers any company question instantly — from an uploaded FAQ/policy PDF. No judgment. No waiting. Available 24x7. |
| 👩‍💻 **HR Team** | A live dashboard showing who is engaging, who is silent, and who flagged themselves as struggling — with one-click check-in nudges. |

**The core insight:** Employees who ask zero questions in Week 1 are the highest attrition risk. DayOne flags silence as a warning signal — not a sign of confidence.

---

## ✨ Features

### 🤖 AI Onboarding Assistant
- Answers company-specific questions instantly from an uploaded HR document
- Powered by Claude AI — handles informal queries, Hinglish, and "basic" questions without judgment
- Every question asked updates the HR dashboard in real time

### 📊 HR Intelligence Dashboard
- Live view of all new hires with onboarding health scores (🟢 Green / 🟡 Yellow / 🔴 Red)
- **Silence Detector** — automatically flags employees with zero activity after 48 hours
- At-risk employee highlighting with one-click check-in nudge
- Onboarding pipeline board with milestone tracking per employee

### 📋 Checklist Hub
- Structured day-by-day onboarding checklist per employee
- Progress tracking across modules: IT Setup, Culture, Compliance, Role Orientation
- Visual completion bars per employee

### 📧 Weekly Check-in Flow
- HR sends a one-click sentiment check-in
- Employee responds: 🟢 Good / 🟡 Okay / 🔴 Struggling — no forms, no friction
- Response auto-updates dashboard and triggers an at-risk flag if struggling

### 📁 Knowledge Base Upload
- HR uploads one PDF (policy doc, FAQ, employee handbook)
- System extracts text automatically — no manual data entry
- AI answers all new hire questions from this document

### 📄 Downloadable Documents
- **Plan Summary** — 30-60-90 day onboarding roadmap PDF
- **Medical Benefits Summary** — Full insurance and wellness benefits PDF

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Database | Supabase (PostgreSQL + Realtime) |
| AI / LLM | Anthropic Claude API |
| PDF Parsing | pdfjs-dist (client-side text extraction) |
| Serverless Functions | Netlify Functions (API keys secured server-side) |
| Routing | React Router v6 |

### Architecture Overview

```
┌──────────────────────────────────────────┐
│            New Hire (Browser)            │
│   Chat UI  →  Serverless Function        │
└──────────────────┬───────────────────────┘
                   │
           ┌───────▼────────┐
           │ Serverless Fn  │  ← API keys secured here
           └───┬────────┬───┘
               │        │
      ┌────────▼──┐  ┌───▼──────────┐
      │  Supabase  │  │  Claude API  │
      │  documents │  │              │
      └────────────┘  └──────────────┘
               │
      ┌────────▼──────────┐
      │  Supabase          │
      │  employees         │
      │  conversations     │  ← HR Dashboard reads here
      │  checkins          │
      └────────────────────┘
```

---

## 📁 Project Structure

```
hrtech-dayone/
├── public/
│   ├── Plan_Summary.pdf
│   └── Medical_Benefits_Summary.pdf
├── src/
│   ├── components/
│   │   └── PDFUpload.jsx           ← HR uploads company FAQ PDF
│   ├── pages/
│   │   ├── Dashboard.jsx           ← HR overview + silence detector
│   │   ├── Employees.jsx           ← Employee directory grid
│   │   ├── EmployeeDetail.jsx      ← Individual health score + activity timeline
│   │   ├── ChecklistHub.jsx        ← Onboarding task progress
│   │   ├── Chat.jsx                ← AI assistant interface
│   │   └── CheckinResponse.jsx     ← Employee sentiment response page
│   ├── hooks/
│   │   └── useEmployees.js         ← Supabase data hook
│   ├── layouts/
│   │   └── WorkspaceLayout.jsx     ← Shared nav + layout wrapper
│   └── supabaseClient.js
├── netlify/
│   └── functions/
│       └── chat.js                 ← Secure Claude API proxy
├── netlify.toml
├── .env.local
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- [Supabase](https://supabase.com) account (free)
- [Anthropic API key](https://console.anthropic.com) (free tier)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/hrtech-dayone.git
cd hrtech-dayone
```

### 2. Install Dependencies

```bash
npm install
npm install pdfjs-dist
```

### 3. Set Up Supabase

Go to Supabase → SQL Editor and run:

```sql
-- Knowledge base (uploaded PDF text)
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  name text,
  content text,
  uploaded_at timestamp default now()
);

-- Weekly sentiment check-ins
create table public.checkins (
  id uuid default gen_random_uuid() primary key,
  employee_id text references public.employees(id),
  sentiment text,
  sent_at timestamp default now(),
  responded_at timestamp,
  response text
);

-- AI chat history
create table public.conversations (
  id uuid default gen_random_uuid() primary key,
  employee_id text references public.employees(id),
  role text,
  content text,
  created_at timestamp default now()
);

-- RPC to increment questions asked per employee
create or replace function increment_questions(emp_id text)
returns void as $$
  update public.employees
  set "questionsAsked" = "questionsAsked" + 1
  where id = emp_id;
$$ language sql;
```

### 4. Configure Environment Variables

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://lbolidvwqnctkujejwqm.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Add these to your deployment platform environment settings:

```
SUPABASE_URL         = https://lbolidvwqnctkujejwqm.supabase.co
SUPABASE_SERVICE_KEY = your_service_role_key
ANTHROPIC_API_KEY    = your_anthropic_api_key
```

---

## 🚀 How to Run

### Local Development

```bash
npm run dev
```

App runs at `http://localhost:5173`

### With Serverless Functions (required for AI Chat)

```bash
npm install -g netlify-cli
netlify dev
```

App + functions run at `http://localhost:8888`

### Build for Production

```bash
npm run build
```

---

## 🎬 Demo Flow (3 Minutes)

| Time | Action | Why It Matters |
|------|--------|----------------|
| 0:00 | HR uploads company FAQ PDF | Zero-setup knowledge base |
| 0:30 | New hire asks "What is the leave policy during probation?" | AI answers from PDF instantly |
| 1:00 | `questionsAsked` increments live on HR dashboard | Real-time engagement signal |
| 1:30 | Employee with 0 questions, 4 days inactive → highlighted red | **The silence detector moment** |
| 2:00 | HR clicks "Send Check-in" → response link sent | One-click intervention |
| 2:30 | Employee clicks 🔴 Struggling → dashboard updates live | Closed-loop signal |
| 3:00 | *"We don't wait for an exit interview. We catch it in Week 1."* | 🎯 |

---

## 🔮 Future Improvements

### Near-Term
- [ ] **WhatsApp Integration** — Check-ins and AI answers via WhatsApp Business API
- [ ] **Real Email Sending** — Transactional check-in emails
- [ ] **Authentication** — Role-based login for HR vs new hire views
- [ ] **Multi-document Support** — Multiple PDFs with vector search

### Medium-Term
- [ ] **Manager View** — Separate dashboard for reporting managers
- [ ] **Automated Nudges** — Scheduled weekly check-ins without manual HR trigger
- [ ] **Hinglish NLP** — Better intent classification for Indian language queries
- [ ] **Cohort Analytics** — Which onboarding week has the highest drop-off?

### Long-Term
- [ ] **Predictive Attrition Score** — Predict 90-day attrition risk by Day 14
- [ ] **HRMS Integrations** — Darwinbox, Keka, Zoho People connectors
- [ ] **Multi-tenant SaaS** — Company-scoped deployments with custom branding
- [ ] **Compliance Layer** — DPDP Act and Indian labour law FAQ auto-population

---

## 🧑‍💻 Built By

**Solo build · HRTechOpen Hackathon · Problem #10**

> *"The best onboarding tool isn't the one with the most features. It's the one that tells you who needs help before they disappear."*

---

## 📄 License

MIT — free to fork, improve, and build on top of.

---

<div align="center">

**HRTech · DayOne · Problem #10**

*Ship the demo. Not the product.*

</div>
