import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrendsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/talent-data')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const avgSalaryByRegion = Array.from(
    data.reduce((map, curr) => {
      const region = curr.Region;
      const entry = map.get(region) || { Region: region, totalSalary: 0, count: 0 };
      entry.totalSalary += curr["Average Salary"];
      entry.count += 1;
      map.set(region, entry);
      return map;
    }, new Map()).values()
  ).map((d) => ({ Region: d.Region, "Avg Salary": Math.round(d.totalSalary / d.count) }));

  const jobsByCompany = Array.from(
    data.reduce((map, curr) => {
      const company = curr.Company;
      const entry = map.get(company) || { Company: company, Jobs: 0 };
      entry.Jobs += curr["Jobs Posted (30 days)"];
      map.set(company, entry);
      return map;
    }, new Map()).values()
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Market Trends</h1>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-2">Average Salary by Region</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={avgSalaryByRegion}>
            <XAxis dataKey="Region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Avg Salary" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Top Hiring Companies (Jobs Posted)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={jobsByCompany}>
            <XAxis dataKey="Company" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Jobs" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}export async function getServerSideProps() {
  return { props: {} };
}
