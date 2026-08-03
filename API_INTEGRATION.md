# API Integration Documentation — RentNest Frontend

This document maps every frontend component and server action to the backend API endpoint it consumes.

**Backend Base URL:** `NEXT_PUBLIC_SERVER_URL` (configured in `.env.local`)
**Authentication:** All protected endpoints use `Authorization: Bearer <accessToken>` forwarded from `httpOnly` cookies via Next.js Server Actions.

---

## Authentication

| Frontend File                                           | Method | Endpoint                  | Description                                                                           |
| -------------------------------------------------------- | ------ | -------------------------- | --------------------------------------------------------------------------------------- |
| `app/(auth)/_actions/authActions.ts` → `loginAction`     | `POST` | `/api/auth/login`         | Authenticates user, sets `accessToken` + `refreshToken` as `httpOnly` cookies           |
| `app/(auth)/_actions/authActions.ts` → `registerAction`  | `POST` | `/api/auth/register`      | Creates new user account, then auto-calls `/api/auth/login` to issue tokens             |
| `app/(auth)/_actions/authActions.ts` → `logoutUser`      | —      | —                          | Deletes `accessToken` + `refreshToken` cookies client-side via Next.js `cookies()`      |
| `proxy.ts` (Next.js Middleware)                          | `POST` | `/api/auth/refresh-token` | Silently refreshes expired `accessToken` using `refreshToken` cookie on every request   |

**Components consuming auth:**

- `app/(auth)/login/page.tsx` — login form with `useActionState`
- `app/(auth)/register/page.tsx` — registration form with React Hook Form + Zod
- `components/shared/navbar.tsx` — reads `useAuthStore` for user state, calls `logoutUser` on logout

---

## Properties (Public)

| Frontend File                                     | Method | Endpoint              | Description                                              |
| --------------------------------------------------- | ------ | ---------------------- | ---------------------------------------------------------- |
| `app/(properties)/_actions/getAllProperties.ts`   | `GET`  | `/api/properties`     | Fetches all properties for browse page and home page     |
| `app/(properties)/_actions/getPropertyDetails.ts` | `GET`  | `/api/properties/:id` | Fetches single property details for property detail page |

**Components consuming:**

- `app/(properties)/browse/page.tsx` — property grid with filter/search
- `components/property/property-browse-client.tsx` — client-side filter UI
- `components/property/property-card.tsx` — individual property card
- `app/(properties)/property/[id]/page.tsx` — property detail page
- `components/property/property-page.tsx` — full property detail view with image gallery

---

## Rental Requests & Reviews

| Frontend File                                                | Method | Endpoint                       | Description                                                    |
| --------------------------------------------------------------- | ------ | --------------------------------- | ------------------------------------------------------------------ |
| `app/(properties)/_actions/submitRequest.ts`                 | `POST` | `/api/rental/:propertyId`      | Tenant submits a rental request for a property                 |
| `app/(dashboard)/dashboard/_actions/getUserSentRequest.ts`   | `GET`  | `/api/rental/my-requests`      | Fetches all rental requests sent by the logged-in tenant        |
| `app/(dashboard)/dashboard/_actions/getAllPayments.ts`       | `GET`  | `/api/rental/my-payments`      | Fetches payment history for the logged-in tenant                |
| `app/(dashboard)/dashboard/_actions/createReview.ts`          | `POST` | `/api/rental/review/:propertyId` | Tenant submits a star rating + written review for a property |

**Components consuming:**

- `components/property/property-page.tsx` — "Request to Rent" button + confirmation `AlertDialog`
- `app/(dashboard)/dashboard/requests/page.tsx` — tenant requests table
- `components/dashboard/tenant/requests-table.tsx` — table with status badges, "Pay Now" button, and review trigger for `COMPLETED` requests
- `components/dashboard/tenant/create-review-modal.tsx` — star rating + text review form, opened from the requests table
- `app/(dashboard)/dashboard/payment-history/page.tsx` — payment history page
- `components/dashboard/tenant/payments-log-table.tsx` — payment log table

---

## Payments (Stripe)

| Frontend File                                                | Method | Endpoint                                | Description                                                          |
| ---------------------------------------------------------------- | ------ | ------------------------------------------ | -------------------------------------------------------------------------- |
| `app/(dashboard)/dashboard/_actions/createPaymentSession.ts` | `POST` | `/api/payments/create/:rentalRequestId` | Creates a Stripe Checkout session, returns `sessionUrl` for redirect |

**Components consuming:**

- `components/dashboard/tenant/requests-table.tsx` — "Pay Now" button calls `createPaymentSession`, redirects to Stripe via `router.push(sessionUrl)`
- `app/(dashboard)/dashboard/payment-success/page.tsx` — Stripe success redirect landing page
- `app/(dashboard)/dashboard/payment-cancel/page.tsx` — Stripe cancel redirect landing page

---

## Landlord Dashboard

| Frontend File                                                             | Method   | Endpoint                                    | Description                                                        |
| ----------------------------------------------------------------------------- | -------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| `app/(dashboard)/landlord-dashboard/_actions/getAllLandlordProperties.ts` | `GET`    | `/api/landlord/properties`                  | Fetches all properties owned by the logged-in landlord             |
| `app/(dashboard)/landlord-dashboard/_actions/createProperty.ts`           | `POST`   | `/api/properties/newlisting`                | Creates a new property listing                                     |
| `app/(dashboard)/landlord-dashboard/_actions/updateProperty.ts`           | `PUT`    | `/api/properties/update/:id`                | Updates an existing property listing                               |
| `app/(dashboard)/landlord-dashboard/_actions/deleteProperty.ts`           | `DELETE` | `/api/landlord/:id`                         | Deletes a property listing                                         |
| `app/(dashboard)/landlord-dashboard/_actions/getIncomingRequests.ts`      | `GET`    | `/api/landlord/requests`                    | Fetches all incoming rental requests for the landlord's properties |
| `app/(dashboard)/landlord-dashboard/_actions/approveRequest.ts`           | `PATCH`  | `/api/landlord/properties/:id?accept=true`  | Approves an incoming rental request                                |
| `app/(dashboard)/landlord-dashboard/_actions/rejectRequest.ts`            | `PATCH`  | `/api/landlord/properties/:id?accept=false` | Rejects an incoming rental request                                 |

**Components consuming:**

- `app/(dashboard)/landlord-dashboard/properties/page.tsx` — property management page
- `components/dashboard/landlord/properties-table.tsx` — CRUD table with Edit/Delete
- `components/dashboard/landlord/create-property-modal.tsx` — create property dialog form
- `components/dashboard/landlord/edit-property-modal.tsx` — edit property dialog form
- `app/(dashboard)/landlord-dashboard/requests/page.tsx` — incoming requests page
- `components/dashboard/landlord/incoming-requests-table.tsx` — approve/reject table with confirmation dialogs

---

## Admin Dashboard

| Frontend File                                                  | Method   | Endpoint                    | Description                                                    |
| -------------------------------------------------------------- | -------- | ---------------------------- | ------------------------------------------------------------------ |
| `app/(dashboard)/admin-dashboard/_actions/getAllUsers.ts`      | `GET`    | `/api/admin/users?page=&limit=` | Fetches paginated platform users (defaults: `page=1`, `limit=20`) |
| `app/(dashboard)/admin-dashboard/_actions/editUser.ts`         | `PATCH`  | `/api/admin/users/:id`      | Updates a user's name, email, role, or ban status               |
| `app/(dashboard)/admin-dashboard/_actions/deleteUser.ts`       | `DELETE` | `/api/admin/users/:id`      | Permanently deletes a user account                              |
| `app/(dashboard)/admin-dashboard/_actions/getAllProperties.ts` | `GET`    | `/api/admin/properties`     | Fetches all properties across the platform                      |
| `app/(dashboard)/admin-dashboard/_actions/deleteProperty.ts`   | `DELETE` | `/api/admin/properties/:id` | Deletes a property listing as admin                             |
| `app/(dashboard)/admin-dashboard/_actions/getAllRequests.ts`   | `GET`    | `/api/admin/rentals`        | Fetches all rental requests across the platform                 |

**Components consuming:**

- `app/(dashboard)/admin-dashboard/users/page.tsx` — user management page
- `components/dashboard/admin/users-table.tsx` — users table with Edit/Delete/Ban actions
- `components/dashboard/admin/edit-user-modal.tsx` — edit user dialog form
- `app/(dashboard)/admin-dashboard/properties/page.tsx` — all properties moderation page
- `components/dashboard/admin/properties-table.tsx` — properties table with delete action
- `app/(dashboard)/admin-dashboard/requests/page.tsx` — all requests moderation page
- `components/dashboard/admin/all-requests-table.tsx` — requests overview table

---

## Route Protection (Middleware)

| File       | Logic                                                                                                                                                                                                                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `proxy.ts` | Next.js Middleware running on all non-static routes. Decodes JWT from `accessToken` cookie to determine `userRole`. Redirects unauthenticated users to `/login?redirectTo=<path>`. Redirects wrong-role users to their correct dashboard. Refreshes expired `accessToken` using `refreshToken` before any protected page renders. |

**Public routes (no auth required):** `/`, `/browse`, `/login`, `/register`, `/property/:id`

**Protected route groups:**

- `/dashboard/*` — TENANT only
- `/landlord-dashboard/*` — LANDLORD only
- `/admin-dashboard/*` — ADMIN only
- `/login`, `/register` — redirect to dashboard if already authenticated

---

## Global State

| File                  | Library                  | State                                                      |
| ---------------------- | -------------------------- | ------------------------------------------------------------ |
| `lib/useAuthStore.ts` | Zustand (with `persist`) | `user: { id, name, email, role }`, `setUser()`, `logout()` |

User state is hydrated from the decoded JWT on login/register and persisted to `localStorage` under the key `rentnest-auth-store`. Cleared on logout.

---

**AI tools were used to assist with documentation structure and wording. All technical details were reviewed and verified by the author.**