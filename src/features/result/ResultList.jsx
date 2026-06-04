import {
  formatEndDate,
  formatUpdatedAt,
  groupRoomsByBuilding,
} from './resultUtils';
import './ResultList.css';

function ResultList({ results = [], buildingMeta = {} }) {
  if (results.length === 0) {
    return <div className="empty-result">검색 결과가 없습니다.</div>;
  }

  const groupedResults = groupRoomsByBuilding(results);

  return (
    <div className="result-grid">
      {Object.entries(groupedResults).map(([building, rooms]) => {
        const endDate = buildingMeta?.[building]?.rentalEndDate;
        const lastUpdatedAt = buildingMeta?.[building]?.rentalLastUpdatedAt;

        return (
          <section className="building-card" key={building}>
            <div className="building-header">
              <div className="building-title-wrapper">
                <div className="building-title">{building}</div>

                {endDate && (
                  <div className="building-end-date">
                    {formatEndDate(endDate)}
                  </div>
                )}
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
