<div align="center">

<img src="https://img.shields.io/badge/HRTechOpen-%2310-4F46E5?style=for-the-badge&logoColor=white" />
<img src="https://img.shields.io/badge/Hackathon-2024-16A34A?style=for-the-badge" />
<img src="https://img.shields.io/badge/Solo%20Build-24hrs-D97706?style=for-the-badge" />

<br/><br/>

```
 ____   ___   __   ____  _  _  ____
(  _ \ / __) / _\ (  __)/ )( \(  __)
 ) _ (( (__ /    \ ) _) ) \/ ( ) _)
(____/ \___)\_/\_/(____)  \__/ (____)
```

# DayOne

### *The AI Onboarding Copilot that detects who's silently struggling — before they become an attrition statistic.*

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Claude AI](https://img.shields.io/badge/Claude-Haiku-4F46E5?style=flat-square)](https://anthropic.com)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat-square&logo=netlify)](https://netlify.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

<br/>

> **HRTechOpen Hackathon — Problem #10: New Hire Onboarding Guide**

</div>

---

## 🧩 The Problem

> *"New employees joining a company often feel lost in the first few weeks because there is no proper guide or checklist to help them settle in."*

Every year, **20% of new hires quit within their first 90 days.** Replacing one employee costs ₹80,000–₹1.5 Lakh. Most of it is preventable.

But here's what nobody talks about:

- ❌ New hires don't ask questions — they're scared of looking incompetent
- ❌ HR assumes **silence = settled in.** It usually means the opposite.
- ❌ No existing tool detects a struggling employee **until they hand in their notice**

Checklists, PDFs, and SharePoint pages exist everywhere. **What's missing is a signal.**

---

## 💡 The Solution

**DayOne** is a two-sided onboarding intelligence platform:

| Side | What They Get |
|------|--------------|
| 🧑‍💼 **New Hire** | An AI chatbot that answers any company question instantly — from an uploaded FAQ/policy PDF. No judgment. No waiting. Available 24x7. |
| 👩‍💻 **HR Team** | A live dashboard showing who is engaging, who is silent, and who flagged themselves as struggling — with one-click check-in nudges. |

**The core insight:** Employees who ask zero questions in Week 1 are the highest attrition risk. DayOne is the first tool that flags silence as a warning signal — not a sign of confidence.

---

## ✨ Features

### 🤖 AI Onboarding Assistant
- Answers any company-specific question instantly using your uploaded HR documents
- Powered by Claude AI with RAG (Retrieval from uploaded PDF)
- Handles Hinglish, informal queries, and "basic" questions without judgment
- Every question asked is tracked and updates the HR dashboard in real time

### 📊 HR Intelligence Dashboard
- Live view of all new hires with health scores (Green / Yellow / Red)
- **Silence Detector** — flags employees with zero activity after 48 hours
- At-risk employee highlighting with one-click check-in nudge
- Onboarding pipeline board with milestone tracking

### 📋 Checklist Hub
- Day-by-day structured onboarding checklist per employee
- Progress tracking across modules: IT Setup, Culture, Compliance, Role Orientation
- Visual completion bars per employee

### 📧 Weekly Check-in Flow
- HR sends a one-click sentiment check-in via email
- Employee responds with 🟢 Good / 🟡 Okay / 🔴 Struggling — no forms, no friction
- Response auto-updates dashboard and triggers at-risk flag if struggling

### 📁 Knowledge Base Upload
- HR uploads one PDF (policy doc, FAQ, handbook)
- System extracts and indexes text automatically — no manual data entry
- AI answers all new hire questions from this document

### 📄 Document Downloads
- **Plan Summary** — 30-60-90 day onboarding roadmap PDF
- **Medical Benefits Summary** — Full insurance & wellness benefits PDF

---

## 🛠️ Tech Stack

```
Frontend          →  React 18 + Vite + Tailwind CSS
Database          →  Supabase (PostgreSQL + Realtime)
AI / LLM          →  Anthropic Claude (claude-haiku-4-5) via REST API
PDF Parsing       →  pdfjs-dist (client-side text extraction)
Serverless        →  Netlify Functions (API key secured server-side)
PDF Generation    →  ReportLab (Python) — for downloadable plan docs
Routing           →  React Router v6
```

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   New Hire (Browser)                │
│   Chat UI  →  /.netlify/functions/chat              │
└─────────────────┬───────────────────────────────────┘
                  │
          ┌───────▼────────┐
          │ Netlify Function│  ← API keys live here (secure)
          │   chat.js       │
          └───┬─────────┬──┘
              │         │
     ┌────────▼──┐  ┌───▼──────────┐
     │  Supabase  │  │ Claude API   │
     │  documents │  │ (Haiku model)│
     │  table     │  │              │
     └────────────┘  └──────────────┘
              │
     ┌────────▼──────────┐
     │  Supabase          │
     │  employees         │
     │  conversations     │  ← HR Dashboard reads from here
     │  checkins          │
     └────────────────────┘
```

---

## 📁 Project Structure

```
dayone-hrtech/
├── public/
│   ├── Plan_Summary.pdf
│   └── Medical_Benefits_Summary.pdf
├── src/
│   ├── components/
│   │   └── PDFUpload.jsx          ← HR uploads company FAQ PDF
│   ├── pages/
│   │   ├── Dashboard.jsx          ← HR overview + silence detector
│   │   ├── Employees.jsx          ← Employee directory grid
│   │   ├── EmployeeDetail.jsx     ← Individual health score + timeline
│   │   ├── ChecklistHub.jsx       ← Onboarding task progress
│   │   ├── Chat.jsx               ← AI assistant interface
│   │   └── CheckinResponse.jsx    ← Employee sentiment response page
│   ├── hooks/
│   │   └── useEmployees.js        ← Supabase data hook
│   ├── layouts/
│   │   └── WorkspaceLayout.jsx    ← Shared nav + layout wrapper
│   └── supabaseClient.js
├── netlify/
│   └── functions/
│       └── chat.js                ← Secure Claude API proxy
├── netlify.toml
├── .env.local
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free)
- An [Anthropic API key](https://console.anthropic.com) (free tier)
- A [Netlify](https://netlify.com) account (free)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dayone-hrtech.git
cd dayone-hrtech
```

### 2. Install Dependencies

```bash
npm install
npm install pdfjs-dist
```

### 3. Set Up Supabase

Go to your Supabase project → SQL Editor and run:

```sql
-- Documents (knowledge base)
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  name text,
  content text,
  uploaded_at timestamp default now()
);

-- Check-ins (weekly sentiment)
create table public.checkins (
  id uuid default gen_random_uuid() primary key,
  employee_id text references public.employees(id),
  sentiment text,
  sent_at timestamp default now(),
  responded_at timestamp,
  response text
);

-- Conversations (AI chat history)
create table public.conversations (
  id uuid default gen_random_uuid() primary key,
  employee_id text references public.employees(id),
  role text,
  content text,
  created_at timestamp default now()
);

-- RPC: increment questions asked
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

Add these in **Netlify → Site Settings → Environment Variables**:

```
SUPABASE_URL          = https://lbolidvwqnctkujejwqm.supabase.co
SUPABASE_SERVICE_KEY  = your_service_role_key
ANTHROPIC_API_KEY     = your_anthropic_api_key
```

---

## 🚀 How to Run

### Local Development

```bash
npm run dev
```

App runs at `http://localhost:5173`

> ⚠️ The AI chat requires the Netlify function. For local testing, use [Netlify CLI](https://docs.netlify.com/cli/get-started/):

```bash
npm install -g netlify-cli
netlify dev
```

App + functions run at `http://localhost:8888`

### Deploy to Netlify

```bash
# Option 1: Connect GitHub repo in Netlify dashboard (recommended)
# Option 2: Deploy via CLI
netlify deploy --prod
```

Build settings (auto-detected from `netlify.toml`):
- **Build command:** `npm run build`
- **Publish directory:** `dist`

---

## 🎬 Demo Flow (3 Minutes)

| Time | Action | Why It Matters |
|------|--------|----------------|
| 0:00 | HR uploads company FAQ PDF | Shows zero-setup knowledge base |
| 0:30 | New hire asks "What is the leave policy during probation?" | Claude answers from PDF instantly |
| 1:00 | questionsAsked counter increments on HR dashboard | Real-time signal to HR |
| 1:30 | HR sees employee with 0 questions, 4 days inactive → highlighted red | **The silence detector moment** |
| 2:00 | HR clicks "Send Check-in" → mailto opens with 3-tap response link | One-click intervention |
| 2:30 | Employee clicks 🔴 Struggling → dashboard updates live | Closed-loop signal |
| 3:00 | *"We don't wait for an exit interview. We catch it in Week 1."* | 🎯 |

---

## 🔮 Future Improvements

### Near-Term (Post-Hackathon Sprint)
- [ ] **WhatsApp Integration** — Send check-ins and receive AI answers via WhatsApp Business API (zero app download needed)
- [ ] **Multi-document Knowledge Base** — Support multiple PDFs with vector search (pgvector on Supabase)
- [ ] **Authentication** — Role-based login for HR vs new hire views
- [ ] **Email via Resend** — Replace mailto with real transactional emails

### Medium-Term (v2.0)
- [ ] **Hinglish NLP** — Fine-tuned intent classification for Indian language queries
- [ ] **Manager View** — Separate dashboard for reporting managers with their team's onboarding health
- [ ] **Automated Nudges** — Cron-based weekly check-ins without HR manually triggering them
- [ ] **Analytics** — Cohort analysis: which onboarding week has the highest drop-off?

### Long-Term (Startup Vision)
- [ ] **Predictive Attrition Score** — ML model trained on onboarding engagement patterns to predict 90-day attrition risk at Day 14
- [ ] **HRMS Integrations** — Darwinbox, Keka, Zoho People API connectors
- [ ] **Multi-tenant SaaS** — Company-scoped deployments with custom branding
- [ ] **Compliance Layer** — FSSAI, DPDP Act, and labour law FAQ auto-population for Indian companies

---

## 🧑‍💻 Built By

**Solo build — 24 hours**

Built for **HRTechOpen Hackathon — Problem #10**

> *"The best onboarding tool isn't the one with the most features. It's the one that tells you who needs help before they disappear."*

---

## 📄 License

MIT License — feel free to fork, improve, and build on top of this.

---

<div align="center">

**HRTechOpen #10 — DayOne**

*Ship the demo. Not the product.*

</div>
