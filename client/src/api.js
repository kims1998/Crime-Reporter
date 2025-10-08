const API_BASE = "http://localhost:8080/api"; // adjust port as needed

export async function fetchData() {
    const res = await fetch(`${API_BASE}/data`);
    return await res.json();
}