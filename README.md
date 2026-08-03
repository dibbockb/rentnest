# RentNest

A rental property platform where landlords list properties, tenants browse and request to rent them, and admins moderate the whole thing. Built with Next.js and a separate Express/PostgreSQL backend.

**Live:** https://rentnest.dibbockb.com/
**API:** https://api.rentnest.dibbockb.com/

## Features

- Auth with JWT access/refresh tokens stored in httpOnly cookies, auto-refreshed via middleware
- Three roles — Tenant, Landlord, Admin — each with a protected dashboard and route guarding
- Property listing, browsing, and detail pages with image galleries
- Rental request flow: tenant requests, landlord approves/rejects
- Stripe Checkout for rent payments, with payment history
- Admin tools to manage users, properties, and rental requests across the platform

## Tech stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **Language:** TypeScript
- **UI:** Tailwind CSS, shadcn/ui (Radix primitives), Framer Motion
- **Forms/validation:** React Hook Form, Zod
- **State:** Zustand
- **Payments:** Stripe

## Getting started

```bash
git clone https://github.com/dibbockb/rentnest.git
cd rentnest
pnpm install
```

Create a `.env.local` file:

```
NEXT_PUBLIC_SERVER_URL=localhost:port
```

Run the dev server:

```bash
pnpm dev
```

The app expects a running instance of the backend — see [rentnest-backend](https://github.com/dibbockb/rentnest-backend).

## Repositories

- Frontend (this repo): https://github.com/dibbockb/rentnest
- Backend: https://github.com/dibbockb/rentnest-backend
