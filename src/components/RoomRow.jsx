import './RoomRow.css';

function RoomRow({ room }) {
  return (
    <div className="room-row">
      <span>{room.건물}</span>
      <span>{room.강의실}</span>
      <span>{room.수용인원}명</span>
    </div>
  );
}

export default RoomRow;
