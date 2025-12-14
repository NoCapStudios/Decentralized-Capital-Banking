export async function fetchApplication(email: string) {
  const res = await fetch(
    `http://localhost:3001/api/applications/${encodeURIComponent(email)}`
  );

  if (!res.ok) throw new Error("Failed to load application");
  return res.json();
}
