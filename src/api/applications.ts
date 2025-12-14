// src/api/applications.ts
export async function fetchApplication(email: string) {
  if (!email) {
    throw new Error("No email provided");
  }

  const res = await fetch(
    `http://localhost:3001/api/applications/${encodeURIComponent(email)}`
  );

  if (!res.ok) {
    throw new Error("Failed to load application");
  }

  return res.json();
}
