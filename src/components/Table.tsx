export default function Table({
  motelsData,
  setModalIsOpen,
  setSelectedMotel,
  setOpenTime,
}: {
  motelsData: TMotel[];
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMotel: React.Dispatch<React.SetStateAction<TMotel | null>>;
  setOpenTime: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  return (
    <table className="w-full text-sm text-left text-gray-400">
      <thead className="text-s text-center bg-gray-700 text-gray-400">
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
      <tbody className="border-b bg-gray-900 border-gray-700">
        {motelsData.map((motel, idx) => (
          <tr
            key={motel.name}
            className="border-b bg-gray-900 border-gray-700 hover:bg-gray-800 cursor-pointer"
            style={{ transition: 'all .25s ease' }}
            onClick={() => {
              setModalIsOpen(true);
              setSelectedMotel(motel);
              setOpenTime(Date.now());
            }}
          >
            <td className="px-4 py-4 text-center font-semibold whitespace-nowrap text-white">
              {idx < 3 ? ['🥇', '🥈', '🥉'][idx] : idx + 1}
            </td>
            <th
              scope="row"
              className="px-6 py-4 text-base font-semibold whitespace-nowrap text-white"
            >
              {motel.name}
            </th>
            <td className="px-10 py-4 text-base relative" title={`${String(motel.rate)}/5`}>
              <div className="absolute top-3   left-7 text-xl">🔥</div>
              <div
                style={{ width: `${motel.rate * 22}px`, gap: '10px' }}
                className="bg-orange-900 h-2 rounded-lg"
              ></div>
            </td>
            <td className="px-8 py-4 text-base">💲{motel.mean_price.toFixed(2)}</td>
            <td className="px-8 py-4 text-base">{motel.opening_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
