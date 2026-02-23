# Backend Mapping for New Hardware Reservation Modules

This file documents the **new routes/modules** added for hardware reservation.
Existing project APIs are untouched.

## Current Development Mode

Frontend can run without backend:

- If `NEXT_PUBLIC_USE_MOCKS` is not set or set to anything except `false`, mock data is used.
- If `NEXT_PUBLIC_USE_MOCKS=false` and `NEXT_PUBLIC_URL` is set, real backend is used.

Main client wrapper: `src/services/hardwareApi.ts`
Mock source: `src/mocks/hardware.ts`

## New Frontend Routes

- `/hardware`
- `/hardware/reserve/[serverId]`
- `/hardware/checkout/[reservationId]`
- `/my-services`
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

### Admin domain

- `GET /admin/hardware/servers`
- `POST /admin/hardware/servers`
- `PATCH /admin/hardware/servers/:id`
- `GET /admin/users`
- `GET /admin/hardware/reservations`
- `POST /admin/hardware/credentials`

## Expected frontend types

See: `src/types/hardware.ts`
