import './App.css';
import Page from './components/Page';
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
    <Page>
      <Search />
      <ResultList rooms={dummyRooms} />
    </Page>
  );
}

export default App;
