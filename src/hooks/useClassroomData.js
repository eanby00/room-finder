import { useEffect, useState } from 'react';
import { fetchClassroomData } from '../api/classroomApi';

export function useClassroomData() {
  const [rooms, setRooms] = useState([]);
  const [regulars, setRegulars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [buildingMeta, setBuildingMeta] = useState({});

  const [isPreparing, setIsPreparing] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function prepareData() {
      try {
        const data = await fetchClassroomData();

        setRooms(data.rooms);
        setRegulars(data.regulars);
        setRentals(data.rentals);
        setBuildingMeta(data.buildingMeta);
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
    rooms,
    regulars,
    rentals,
    buildingMeta,
    setRentals,
    setBuildingMeta,
    isPreparing,
    isDataReady,
    errorMessage,
    setErrorMessage,
  };
}
