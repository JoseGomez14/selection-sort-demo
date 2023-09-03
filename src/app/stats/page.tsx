'use client';
import SortingVisualizer from '@/components/SortingVisualizer';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { firestoreDb } from '@/firebase/config';
import { parseData } from '@/utils/parsing';
import Link from 'next/link';

export default function page() {
  const [dataStats, setDataStats] = useState<any[]>([]);

  useEffect(() => {
    getDocs(collection(firestoreDb, 'db-lab')).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDataStats((prev) => [...prev, doc.data()]);
      });
    });
  }, []);

  return (
    <section className="flex-col justify-center items-center text-center pb-6">
      <div className="w-full flex justify-center items-center">
        <Link href="/">
          <img src="/logo.png" alt="Hot Sorting Logo" className="h-56" />
        </Link>
      </div>
      <div>
        <h1 className="text-white text-2xl font-semibold">Users clicks tracker</h1>
        {dataStats.length !== 0 ? <SortingVisualizer array={parseData(dataStats)} clicks /> : null}
        {!dataStats.length && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      <div className="mt-16">
        <h1 className="text-white text-2xl font-semibold">Users time tracker</h1>
        {dataStats.length !== 0 ? <SortingVisualizer array={parseData(dataStats)} /> : null}
        {!dataStats.length && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </section>
  );
}
