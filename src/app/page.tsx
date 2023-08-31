import MotelsData from "@/db/motels.json";
import Table from "@/components/Table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hot Order</h1>
      <article className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table motelsData={MotelsData} />
      </article>
    </main>
  );
}
