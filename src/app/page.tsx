'use client';
import MotelsData from '@/db/motels.json';
import Table from '@/components/Table';
import { useState, useEffect } from 'react';
import { EAttribute, EOrder, selectionSort } from '@/utils/sorting';
import Filters from '@/components/Filters';
import Modal from '@/components/Modal';

export default function Home() {
  const [data, setData] = useState<TMotel[]>([]);
  const [order, setOrder] = useState<EOrder>(EOrder.ASC);
  const [attribute, setAttribute] = useState<EAttribute>(EAttribute.NAME);
  const [partialOrder, setPartialOrder] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMotel, setSelectedMotel] = useState<TMotel | null>(null);
  const [openTime, setOpenTime] = useState(0);

  useEffect(() => {
    if (data.length === 0) {
      setData(selectionSort(MotelsData, attribute, order, partialOrder));
    } else {
      setData(selectionSort([...data], attribute, order, partialOrder));
    }
  }, [MotelsData, attribute, order, partialOrder]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24">
      <img src="/logo.png" alt="Hot Sorting Logo" className="h-56" />
      {data.length !== 0 ? (
        <>
          <Filters
            setAttribute={setAttribute}
            setOrder={setOrder}
            setPartialOrder={setPartialOrder}
          />
          <article className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table
              motelsData={data}
              setModalIsOpen={setModalIsOpen}
              setSelectedMotel={setSelectedMotel}
              setOpenTime={setOpenTime}
            />
          </article>
          <Modal
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            selectedMotel={selectedMotel}
            openTime={openTime}
          />
        </>
      ) : (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </main>
  );
}
