'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SortingAnimation({ array, clicks }: { array: TData[]; clicks?: boolean }) {
  const [arrayState, setArrayState] = useState(array);
  const [varI, setVarI] = useState(0);
  const [varJ, setVarJ] = useState(0);
  const [varMin, setVarMin] = useState(0);
  const [speed, setSpeed] = useState(350);

  const selectionSort = async () => {
    let arr = arrayState;
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      setVarI(i);
      setVarMin(i);
      for (let j = i; j < arr.length; j++) {
        setVarJ(j);
        await new Promise((resolve) => setTimeout(resolve, speed));
        if (arr[j][clicks ? 'clicks' : 'openTime'] < arr[min][clicks ? 'clicks' : 'openTime']) {
          min = j;
          setVarMin(j);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, speed));
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
      setArrayState([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  };

  return (
    <article className="w-full overflow-x-hidden flex-col items-center justify-center text-center">
      <div className="flex w-screen my-6 items-end justify-center">
        {arrayState.map((motel, index) => {
          let color = '#40B4D0';
          let border = 'none';
          let maxBarSize = Math.max(
            ...arrayState.map((motel) => motel[clicks ? 'clicks' : 'openTime']),
          );

          if (varI !== arrayState.length - 1) {
            if (index === varMin || index === varJ) {
              border = '2px solid #D08A40';
            }
            if (index === varI) {
              border = '2px solid #D04040';
            }
          }

          if (index < varI || varI === arrayState.length - 1) {
            color = '#40D08A';
          }

          if (index === arrayState.length - 1 && index !== varMin) {
            border = 'none';
          }

          return (
            <motion.div
              key={index}
              style={{
                height: `${(motel[clicks ? 'clicks' : 'openTime'] * 300) / maxBarSize + 30}px`,
                width: '40px',
                backgroundColor: color,
                border: border,
                margin: '5px',
                borderTopRightRadius: '4px',
                borderTopLeftRadius: '4px',
                cursor: 'pointer',
              }}
              initial={{ opacity: 0, scale: 0.5, backgroundColor: color }}
              animate={{ opacity: 1, scale: 1, backgroundColor: color }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0 }}
              title={motel.name}
            >
              <div className="text-center py-1 text-white">
                {clicks ? motel.clicks : motel.openTime.toFixed(1)}
              </div>
            </motion.div>
          );
        })}
      </div>
      <label>
        Speed:
        <select
          className="bg-black"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        >
          <option value="10">Fast</option>
          <option value="350">Normal</option>
          <option value="700">Slow</option>
        </select>
      </label>
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ml-4"
        onClick={selectionSort}
      >
        Sort
      </button>
    </article>
  );
}
