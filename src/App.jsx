import './App.css';
import ResultList from './features/result/ResultList';
import Search from './features/search/Search';

const dummyRooms = [
  {
    buildingName: '제1공학관',
    roomName: '201',
    capacity: 80,
  },
  {
    buildingName: '제2공학관',
    roomName: '202',
    capacity: 50,
  },
];

function App() {
  return (
    <main className="page">
      <Search />
      <ResultList rooms={dummyRooms} />
    </main>
  );
}

export default App;
