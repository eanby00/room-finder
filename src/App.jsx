import { useState } from 'react';
import Page from './components/Page';
import Search from './features/search/Search';
import ResultList from './features/result/ResultList';
import Modal from './components/Modal';
import { searchAvailableRooms } from './features/search/searchRooms';
import { useClassroomData } from './hooks/useClassroomData';
import './App.css';

function App() {
  const {
    rooms,
    regulars,
    rentals,
    rentalMeta,
    setRentals,
    setRentalMeta,
    isPreparing,
    isDataReady,
    errorMessage,
    setErrorMessage,
  } = useClassroomData();

  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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

  const closeModal = () => {
    setErrorMessage('');
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
        <Modal onClose={closeModal}>
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
