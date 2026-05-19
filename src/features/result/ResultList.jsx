import RoomRow from '../../components/RoomRow';
import './ResultList.css';

function ResultList({ results = [] }) {
  if (results.length === 0) {
    return <div className="empty-result">검색 결과가 없습니다.</div>;
  }

  return (
    <section className="result-list">
      <div className="result-header">
        <span>건물명</span>
        <span>강의실</span>
        <span>수용인원</span>
      </div>

      {results.map((room) => (
        <RoomRow key={`${room.건물}-${room.강의실}`} room={room} />
      ))}
    </section>
  );
}

export default ResultList;
