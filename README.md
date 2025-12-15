# 🏦 Agentic AI–Powered Personal Loan Chatbot (BFSI)

An **Agentic AI-based conversational sales assistant** designed for the BFSI domain to automate and optimize the **end-to-end personal loan journey** — from customer interaction to sanction letter generation — using multiple collaborating AI agents.

This project was developed as part of the **EY Techathon – Challenge II (BFSI | Tata Capital)**.

---

## 🚀 Problem Statement

Non-Banking Financial Companies (NBFCs) face low conversion rates in personal loan sales due to:
- Manual sales processes
- Delayed verification and underwriting
- Customer drop-offs during loan journeys
- Lack of personalized digital engagement

The objective is to build a **human-like AI chatbot** that can:
- Engage customers conversationally
- Coordinate multiple AI agents
- Complete loan sales and approvals within a single chat session

---

## 💡 Solution Overview

We propose an **Agentic AI architecture** where a **Master Agent** orchestrates multiple **Worker AI Agents**, each responsible for a specific part of the loan process.

The chatbot simulates a real bank sales executive and handles:
- Sales conversation
- KYC verification
- Credit evaluation
- Eligibility checks
- Sanction letter generation

All interactions are completed **digitally and automatically**.

---

## 🧠 Agentic AI Architecture

### 🔹 Master Agent (AI Orchestrator)
- Manages the entire conversation flow
- Understands customer intent
- Triggers appropriate Worker AI agents
- Explains approvals, rejections, and next steps
- Starts and ends the conversation

### 🔹 Worker AI Agents

#### 1️⃣ Sales Agent
- Captures loan requirements (amount, tenure)
- Calculates EMI
- Persuades customer with personalized offers
- Fetches pre-approved loan limits

#### 2️⃣ Verification Agent
- Validates KYC details
- Fetches phone & address data from a dummy CRM server

#### 3️⃣ Underwriting Agent
- Fetches credit score from a mock Credit Bureau API
- Applies eligibility rules:
  - Reject if credit score < 700
  - Instant approval if loan ≤ pre-approved limit
  - Salary slip required if loan ≤ 2× pre-approved limit
  - EMI must be ≤ 50% of salary

#### 4️⃣ Sanction Letter Generator
- Generates automated **PDF sanction letter**
- Includes loan amount, tenure, EMI, and interest rate

---

## 🔄 End-to-End Flow

1. Customer lands on web chatbot via digital ads or emails  
2. Master Agent initiates conversation  
3. Sales Agent discusses loan details  
4. Verification Agent validates KYC  
5. Underwriting Agent evaluates credit & eligibility  
6. Salary slip requested (if required)  
7. Loan approved / rejected  
8. Sanction letter generated (if approved)  
9. Chat session closed gracefully  

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | Web-based Chatbot UI (React / HTML-CSS-JS) |
| Backend | FastAPI / Node.js |
| AI / LLM | GPT-based Conversational AI |
| Architecture | Agentic AI (Master + Worker Agents) |
| APIs | Mock CRM, Credit Bureau, Offer Engine |
| Documents | Automated PDF Generation |
| Storage | Local / Mock File Upload |

---

## 📊 Dummy Data & Assumptions

- Synthetic customer data for 10 users
- Mock credit scores (0–900)
- Pre-approved loan limits via Offer Engine
- Dummy salary slip uploads (PDF/image)
- Rule-based underwriting logic for demo purposes

---

## 📁 Project Structure

agentic-loan-chatbot/
│
├── frontend/
│ └── chatbot-ui/
│
├── backend/
│ ├── master_agent/
│ ├── sales_agent/
│ ├── verification_agent/
│ ├── underwriting_agent/
│ └── sanction_generator/
│
├── mock_services/
│ ├── crm_server.py
│ ├── credit_bureau_api.py
│ └── offer_engine.py
│
├── docs/
│ ├── architecture_diagram.png
│ ├── flowchart.png
│ └── wireframes.pdf
│
├── README.md


---

## 📈 Business Impact

- 📌 Increased personal loan conversion rates
- ⏱ Reduced loan processing time (minutes instead of days)
- 🤖 24×7 AI-powered digital sales assistant
- 💰 Higher revenue from existing customers
- 📉 Reduced operational & manual costs

---

## 🎯 Key Highlights

- True **Agentic AI orchestration**
- Human-like conversational sales flow
- End-to-end automation in a single chat
- Scalable and extensible architecture
- BFSI-compliant decision logic

---

## 📌 Future Enhancements

- Fraud detection agent
- Voice-based chatbot
- Cross-sell & upsell recommendations
- Analytics & monitoring dashboard
- Real credit bureau and CRM integrations

---

## 🏆 EY Techathon Submission Note

This project includes:
- ✅ Architecture Diagram
- ✅ Flowchart
- ✅ Wireframes
- ✅ Working prototype concept
- ✅ Demonstrable Agentic AI logic

---

## 👥 Team

Developed by a passionate team for **EY Techathon – BFSI Challenge**  
Focused on building scalable, AI-driven digital finance solutions.

---

## 📜 License

This project is developed for **educational and hackathon purposes only**.
