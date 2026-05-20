import './ResultList.css';

function ResultList({ results = [] }) {
  if (results.length === 0) {
    return <div className="empty-result">검색 결과가 없습니다.</div>;
  }

  const groupedResults = results.reduce((acc, room) => {
    const building = room.건물;

    if (!acc[building]) acc[building] = [];
    acc[building].push(room);

    return acc;
  }, {});

  return (
    <div className="result-grid">
      {Object.entries(groupedResults).map(([building, rooms]) => (
        <section className="building-card" key={building}>
          <div className="building-header">{building}</div>

          <div className="room-table">
            <div className="room-table-header">
              <span>강의실</span>
              <span>수용인원</span>
            </div>

            {rooms.map((room) => (
              <div className="room-row" key={`${room.건물}-${room.강의실}`}>
                <span>{room.강의실}</span>
                <span>{room.수용인원}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ResultList;
