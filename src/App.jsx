import { useEffect, useState } from 'react';
import Page from './components/Page';
import Search from './features/search/Search';
import ResultList from './features/result/ResultList';
import { fetchClassroomData } from './api/classroomApi';
import { searchAvailableRooms } from './features/search/searchRooms';
import './App.css';
import Modal from './components/Modal';

function App() {
  const [rooms, setRooms] = useState([]);
  const [regulars, setRegulars] = useState([]);
  const [results, setResults] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [rentalMeta, setRentalMeta] = useState({});

  const [isPreparing, setIsPreparing] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function prepareData() {
      try {
        const data = await fetchClassroomData();

        setRooms(data.rooms);
        setRegulars(data.regulars);
        setRentals(data.rentals);
        setRentalMeta(data.rentalMeta);
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

  const handleSearch = (condition) => {
    setHasSearched(true);

    if (!isDataReady) {
      setErrorMessage(
        '강의실 데이터를 준비 중입니다. 잠시 후 다시 검색해 주세요.'
      );
      return;
    }

    setErrorMessage('');

    const availableRooms = searchAvailableRooms({
      rooms,
      regulars,
      rentals,
      ...condition,
    });

    setResults(availableRooms);
  };

  return (
    <Page>
      <Search
        onError={setErrorMessage}
        onSearch={handleSearch}
        setRentals={setRentals}
        setRentalMeta={setRentalMeta}
      />

      {isPreparing && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="prepare-message">강의실 데이터를 준비 중입니다.</p>
        </div>
      )}

      {errorMessage && (
        <Modal onClose={() => setErrorMessage('')}>
          <div className="loading-content">
            <p>{errorMessage}</p>
          </div>
        </Modal>
      )}

      {hasSearched && isDataReady && (
        <ResultList results={results} rentalMeta={rentalMeta} />
      )}
    </Page>
  );
}

export default App;
