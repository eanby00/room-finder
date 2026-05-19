import { useState } from 'react';
import Page from './components/Page';
import Search from './features/search/Search';
import ResultList from './features/result/ResultList';
import { searchAvailableRooms } from './api/classroomApi';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (condition) => {
    try {
      setIsLoading(true);
      setHasSearched(true);
      setErrorMessage('');

      const data = await searchAvailableRooms(condition);

      setRooms(data.rooms || []);
    } catch (error) {
      setRooms([]);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Search onSearch={handleSearch} disabled={isLoading} />

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>사용 가능한 강의실을 검색하는 중입니다.</p>
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && hasSearched && <ResultList results={rooms} />}
    </Page>
  );
}

export default App;
