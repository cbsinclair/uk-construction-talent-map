import { useState, useEffect } from 'react';

export default function MapPage() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState('');

  useEffect(() => {
    fetch('/api/talent-data')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const filtered = region ? data.filter((d) => d.Region === region) : data;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Talent Map</h1>
      <label className="block mb-4">
        Filter by Region:
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="ml-2 p-2 border rounded">
          <option value="">All</option>
          {[...new Set(data.map((d) => d.Region))].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="p-4 border rounded-xl shadow">
            <h2 className="font-bold text-lg">{item.Region}</h2>
            <p><strong>Job Title:</strong> {item["Job Title"]}</p>
            <p><strong>Company:</strong> {item.Company}</p>
            <p><strong>Avg Salary:</strong> £{item["Average Salary"]}</p>
            <p><strong>Jobs Posted (30 days):</strong> {item["Jobs Posted (30 days)"]}</p>
          </div>
        ))}
      </div>
    </main>
  );
}export async function getServerSideProps() {
  return { props: {} };
}
