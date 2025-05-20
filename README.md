# ACRA - Database Security Suite

## Course Information
- **Course:** Advanced Network Security - NT534.P21.ANTN
- **Topic:** Database Firewall

---

## Introduction

**Acra** is an application-level encryption and data security toolkit for modern distributed applications. Acra allows app developers to encrypt sensitive data, manage the keys, apply tokenization, data masking, request filtering, generate audit logs and security events, automate reactions on security boundary.

Acra is written in Go, aimed for modern cloud applications that store sensitive data in any databases. Acra consists of several components that apply security controls exactly where the data flows.

- **Source:** [https://github.com/cossacklabs/acra/](https://github.com/cossacklabs/acra/)
- **Acra Engineering Examples:** [https://github.com/cossacklabs/acra-engineering-demo](https://github.com/cossacklabs/acra-engineering-demo)
- **Documentation:** [https://github.com/cossacklabs/acra-engineering-demo](https://docs.cossacklabs.com/acra/)

---

## System Architecture

- **Acra Server:** Ubuntu 20.04.6 LTS
- **PostgreSQL:** Ubuntu 24.04 LTS
- **Application:** Ubuntu 24.04 LTS

![System Architecture](src/architecture.png)

---

## Directory Structure

```bash
NT534-Database-Security-Suite/
├── acra/         # Acra Server configuration (runs on Acra Server)
├── backend/      # Backend source code (runs on Application)
├── frontend/     # Frontend source code (runs on Application)
├── database/     # Database setup & query scripts (runs on PostgreSQL)
├── src/          
└── README.md
```

---
