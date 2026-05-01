const DEFAULT_ADMIN_EMAILS = ['whatkatieseas@gmail.com'];

function parseAdminEmails() {
  const configuredEmails = import.meta.env.VITE_ADMIN_EMAILS as string | undefined;
  const emails = configuredEmails
    ? configuredEmails.split(',').map((email) => email.trim().toLowerCase()).filter(Boolean)
    : DEFAULT_ADMIN_EMAILS;

  return new Set(emails);
}

const adminEmails = parseAdminEmails();

export function isAllowedAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  return adminEmails.has(email.trim().toLowerCase());
}
