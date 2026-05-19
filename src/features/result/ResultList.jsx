import RoomRow from '../../components/RoomRow';
import './ResultList.css';

function ResultList({ rooms }) {
  if (rooms.length === 0) {
    return <div className="empty-result">검색 결과가 없습니다.</div>;
  }

  return (
    <section className="result-list">
      <div className="result-header">
        <span>건물명</span>
        <span>강의실</span>
        <span>수용인원</span>
      </div>

      {rooms.map((room) => (
        <RoomRow key={`${room.buildingName}-${room.roomName}`} room={room} />
      ))}
    </section>
  );
}

export default ResultList;
