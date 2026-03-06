# Backend Mapping for Hardware Reservation

This file documents the routes/modules for hardware reservation.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL (required)
- `NEXT_PUBLIC_URL` - Legacy fallback for API URL

Main client wrapper: `src/services/hardwareApi.ts`
HTTP helpers: `src/services/http.ts`

## New Frontend Routes

- `/hardware`
- `/hardware/reserve/[serverId]`
- `/hardware/checkout/[reservationId]`
- `/admin`
- `/admin/servers`
- `/admin/users`
- `/admin/reservations`
- `/admin/credentials`

## Suggested Backend Endpoints

### User domain

- `GET /dashboard/stats`
- `GET /hardware/servers?basis=CPU|GPU&cpu=...&gpu=...`
- `GET /hardware/servers/:serverId/timeslots?unit=HOURLY|DAILY&date=YYYY-MM-DD`
- `POST /hardware/reservations/preview`
- `POST /hardware/reservations/checkout`
- `GET /hardware/my-services`

Suggested checkout request/response (for direct frontend compatibility):

- request:
  - `{ "server_id": 1, "unit": "HOURLY", "start_at": "...", "end_at": "...", "total_amount": 1200000 }`
  - or `{ "preview_id": "..." }` if backend uses preview tokens
- response:
  - `{ "data": { "reservation_id": 5010 } }`

### Admin domain

- `GET /admin/hardware/servers`
- `POST /admin/hardware/servers`
- `PATCH /admin/hardware/servers/:id`
- `GET /admin/users`
- `GET /admin/hardware/reservations`
- `POST /admin/hardware/credentials`

## Expected frontend types

See: `src/types/hardware.ts`

Notable types used for checkout integration:

- `CheckoutReservationPayload`
- `CheckoutReservationResult`
