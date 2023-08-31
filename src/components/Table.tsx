import { parsingRate } from "@/utils/parsing";

export default function Table({
  motelsData,
}: {
  motelsData: TMotel[];
}): React.JSX.Element {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-s text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            N°
          </th>
          <th scope="col" className="px-8 py-3">
            Name
          </th>
          <th scope="col" className="px-8 py-3">
            Rate
          </th>
          <th scope="col" className="px-8 py-3">
            Price
          </th>
          <th scope="col" className="px-8 py-3">
            Since
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        {motelsData.map((motel, idx) => (
          <tr
            key={motel.name}
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          >
            <td className="px-4 py-4 text-base text-center font-semibold text-gray-900 whitespace-nowrap dark:text-white">
              {idx < 3 ? ["🥇", "🥈", "🥉"][idx] : idx + 1}
            </td>
            <th
              scope="row"
              className="px-6 py-4 text-base font-semibold text-gray-900 whitespace-nowrap dark:text-white"
            >
              {motel.name}
            </th>
            <td className="px-8 py-4 text-base">{parsingRate(motel)}</td>
            <td className="px-8 py-4 text-base">💲{motel.mean_price}</td>
            <td className="px-8 py-4 text-base">{motel.opening_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
