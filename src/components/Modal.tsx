'use client';
import { firestoreDb } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export default function Modal({
  isOpen,
  setIsOpen,
  selectedMotel,
  openTime,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMotel: TMotel | null;
  openTime: number;
}): React.JSX.Element {
  async function handleClose() {
    let time = new Date().getTime() - openTime;

    fetch('https://api.ipify.org?format=json').then((res) => {
      res
        .json()
        .then((data) => {
          let ip = data.ip || 'unknown';
          addDoc(collection(firestoreDb, 'db-lab'), {
            ip,
            openTime: time,
            motelId: selectedMotel?.id,
          });
        })
        .finally(() => {
          setIsOpen(false);
        });
    });
  }

  return (
    <>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-full flex items-center justify-center py-12 bg-black bg-opacity-80 transition-all duration-300`}
        style={{ zIndex: 100 }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full cursor-zoom-out"
          onClick={handleClose}
        ></div>
        <div className="relative w-full mx-4 max-w-xl h-full overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-600 rounded-md">
          <div className="absolute top-0 p-8 right-0" style={{ zIndex: 120 }}>
            <button
              className="text-xl bg-slate-50 rounded-full p-1 cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={handleClose}
            >
              ❌
            </button>
          </div>
          <div className="relative w-full h-full">
            <div className="w-full py-6 px-8  flex-col items-center justify-center bg-gradient-to-r from-rose-700 to-pink-600">
              <h1 className="text-4xl text-white font-bold">{selectedMotel?.name}</h1>
              <h2 className="text-2xl text-ellipsis text-white font-bold">
                💲{selectedMotel?.mean_price.toFixed(2)}
              </h2>
            </div>
            <div className="py-6 px-8 w-full text-center flex-col items-center justify-center">
              <h3 className="text-white py-6 text-6xl font-bold">
                {selectedMotel?.rate.toFixed(1)}/5.0 ⭐
              </h3>
              <div className="bg-orange-900 m-auto w-96 h-2 rounded-lg"></div>
              <p>
                Dispuesto a la satisfación de sus clientes desde:
                <br></br>
                {selectedMotel?.opening_date}
              </p>
              {selectedMotel?.image && (
                <img className="py-4 w-4/6 m-auto" src={selectedMotel?.image} alt="Random" loading='lazy' />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
