# Admin Security Guide

This project uses two admin protection layers.

## 1. Frontend Admin Gate

`src/lib/adminAccess.ts` checks the signed-in user's email against `VITE_ADMIN_EMAILS`.

Example `.env.local` value:

```bash
VITE_ADMIN_EMAILS=whatkatieseas@gmail.com
```

This only controls the website UI. It is useful for a clean user experience, but it is not the real security boundary.

## 2. Supabase RLS Security

The real protection is Supabase Row Level Security.

Run this SQL after the posts, gallery, and storage SQL files:

```text
docs/supabase-admin-security.sql
```

That script creates `public.admin_users` and limits database/storage writes to users whose email exists in that table.

To add another admin:

```sql
insert into public.admin_users (email)
values ('new-admin@example.com')
on conflict (email) do nothing;
```

To remove an admin:

```sql
delete from public.admin_users
where email = 'new-admin@example.com';
```

## Supabase Dashboard Setting

Before production, turn off public signups:

`Authentication -> Sign In / Providers -> Allow new users to sign up -> off`

This is the setting shown in the Supabase screenshot. Katie can still sign in because her user already exists. If a new admin is needed later, create/invite that user intentionally in Supabase, then add the email to `public.admin_users`.

## Current Risk Notes

- The anon Supabase key is safe to expose in the browser only because RLS is enabled.
- Do not put the service role key in `.env.local`, `.env.example`, frontend code, or Git.
- Public media files in the `media` bucket are readable by anyone with the URL. This is expected for images shown on the public site.
- Admin uploads are allowed only for admins after `docs/supabase-admin-security.sql` has been run.
