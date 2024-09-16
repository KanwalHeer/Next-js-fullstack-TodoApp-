const API_URL = '/api/name';

export async function createName(name: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!response.ok) {
    throw new Error('Failed to create name');
  }
  return response.json();
}

export async function getNames() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch names');
  }
  return response.json();
}

export async function updateName(id: string, name: string) {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name })
  });
  if (!response.ok) {
    throw new Error('Failed to update name');
  }
  return response.json();
}

export async function deleteName(id: string) {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete name');
  }
  return response.json();
}
