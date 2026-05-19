import './RoomRow.css';

function RoomRow({ room }) {
  return (
    <div className="room-row">
      <span>{room.buildingName}</span>
      <span>{room.roomName}</span>
      <span>{room.capacity}명</span>
    </div>
  );
}

export default RoomRow;
