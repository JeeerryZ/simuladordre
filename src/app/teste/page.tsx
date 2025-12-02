import PopulationFill from "@/components/populationFill";

export default function Page() {
  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <PopulationFill population={250000} />
        <p>250.000 hab (25%)</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <PopulationFill population={500000} color='#10b981' />
        <p>500.000 hab (50%)</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <PopulationFill population={750000} color='#f59e0b' />
        <p>750.000 hab (75%)</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <PopulationFill population={1000000} color='#ef4444' />
        <p>1.000.000 hab (100%)</p>
      </div>
    </div>
  );
}
