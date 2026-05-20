import './ResultList.css';

function ResultList({ results = [], rentalMeta = {} }) {
  if (results.length === 0) {
    return <div className="empty-result">검색 결과가 없습니다.</div>;
  }

  const groupedResults = results.reduce((acc, room) => {
    const building = room.건물;

    if (!acc[building]) acc[building] = [];
    acc[building].push(room);

    return acc;
  }, {});

  const formatUpdatedAt = (value) => {
    if (!value) return '갱신 정보 없음';

    return new Date(value).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="result-grid">
      {Object.entries(groupedResults).map(([building, rooms]) => {
        const endDate = rentalMeta?.[building]?.endDate;
        const lastUpdatedAt = rentalMeta?.[building]?.lastUpdatedAt;

        return (
          <section className="building-card" key={building}>
            <div className="building-header">
              <div className="building-title-wrapper">
                <div className="building-title">{building}</div>

                <div className="building-end-date">{`(~${endDate})`}</div>
              </div>

              <div className="rental-updated-at">
                정보 갱신일: {formatUpdatedAt(lastUpdatedAt)}
              </div>
            </div>

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
        );
      })}
    </div>
  );
}

export default ResultList;
