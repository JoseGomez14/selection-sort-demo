import { EAttribute, EOrder } from '@/utils/sorting';

export default function Filters({
  setAttribute,
  setOrder,
  setPartialOrder,
}: {
  setAttribute: React.Dispatch<React.SetStateAction<EAttribute>>;
  setOrder: React.Dispatch<React.SetStateAction<EOrder>>;
  setPartialOrder: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  return (
    <article className="flex flex-col items-center justify-center py-4">
      <form action={undefined} className="flex items-center justify-center gap-4">
        <label htmlFor="attribute" className="mr-4">
          Sort by:
          <select
            name="attribute"
            id="attribute"
            className="px-3 py-2 rounded-md shadow-md bg-black text-white border-none outline-none"
            onChange={(e) => {
              setAttribute(e.target.value as EAttribute);
            }}
          >
            <option value={EAttribute.NAME}>Name</option>
            <option value={EAttribute.RATE}>Rate</option>
            <option value={EAttribute.PRICE}>Price</option>
            <option value={EAttribute.DATE}>Date</option>
          </select>
        </label>
        <label htmlFor="order" className="mr-4">
          Order:
          <select
            name="order"
            id="order"
            className="px-4 py-2 rounded-md shadow-md bg-black text-white border-none outline-none"
            onChange={(e) => {
              setOrder(e.target.value as EOrder);
            }}
          >
            <option value={EOrder.ASC}>Ascending</option>
            <option value={EOrder.DESC}>Descending</option>
          </select>
        </label>
        <label htmlFor="partialOrder" className="mr-4">
          Partial Order:
          <input
            type="number"
            name="partialOrder"
            id="partialOrder"
            min={0}
            max={10}
            placeholder="All"
            className="px-4 py-2 rounded-md shadow-md bg-black text-white border-none outline-none"
            onChange={(e) => {
              setPartialOrder(Number(e.target.value));
            }}
          />
        </label>
      </form>
    </article>
  );
}
