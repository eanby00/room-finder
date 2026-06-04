import { useEffect, useState } from 'react';
import { fetchClassroomData } from '../api/classroomApi';

export function useClassroomData() {
  const [classroomData, setClassroomData] = useState({
    rooms: [],
    regulars: [],
    rentals: [],
    buildingMeta: {},
  });

  const [isPreparing, setIsPreparing] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function prepareData() {
      try {
        const data = await fetchClassroomData();

        setClassroomData({
          rooms: data.rooms,
          regulars: data.regulars,
          rentals: data.rentals,
          buildingMeta: data.buildingMeta,
        });

        setIsDataReady(true);
      } catch (error) {
        setErrorMessage('강의실 데이터를 준비하지 못했습니다.');
        console.error(error);
      } finally {
        setIsPreparing(false);
      }
    }

    prepareData();
  }, []);

  return {
    classroomData,
    setClassroomData,
    isPreparing,
    isDataReady,
    errorMessage,
    setErrorMessage,
  };
}
