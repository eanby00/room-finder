import { useState } from 'react';
import Card from '../../components/Card';
import FormField from '../../components/FormField';
import RentalUpdateModal from '../rental/RentalUpdateModal';
import { logSearchUsage } from '../../api/classroomApi';
import { TIME_OPTIONS } from './searchConstants';
import { createSearchPayload, isValidTimeRange } from './searchUtils';
import './Search.css';

function Search({ onSearch, onError, setClassroomData }) {
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [searchCondition, setSearchCondition] = useState({
    useDate: new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Seoul',
    }).format(new Date()),
    startTime: '08:00',
    endTime: '13:00',
    capacity: '0',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchCondition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCapacityFocus = () => {
    if (searchCondition.capacity !== '0') return;

    setSearchCondition((prev) => ({
      ...prev,
      capacity: '',
    }));
  };

  const handleCapacityBlur = () => {
    if (searchCondition.capacity !== '') return;

    setSearchCondition((prev) => ({
      ...prev,
      capacity: '0',
    }));
  };

  const handleSearch = () => {
    if (!isValidTimeRange(searchCondition.startTime, searchCondition.endTime)) {
      onError('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }
    logSearchUsage();

    onError('');
    onSearch(createSearchPayload(searchCondition));
  };

  return (
    <>
      <Card title="후보 강의실 검색기">
        <div className="search-form-grid">
          <FormField label="사용일">
            <input
              type="date"
              name="useDate"
              value={searchCondition.useDate}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="시작시간">
            <select
              name="startTime"
              value={searchCondition.startTime}
              onChange={handleChange}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="사용 인원">
            <input
              type="number"
              name="capacity"
              min="0"
              value={searchCondition.capacity}
              onChange={handleChange}
              onFocus={handleCapacityFocus}
              onBlur={handleCapacityBlur}
            />
          </FormField>

          <FormField label="종료시간">
            <select
              name="endTime"
              value={searchCondition.endTime}
              onChange={handleChange}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="primary-button"
            onClick={handleSearch}
          >
            검색
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setIsRentalModalOpen(true)}
          >
            대관 데이터 갱신
          </button>
        </div>
      </Card>

      {isRentalModalOpen && (
        <RentalUpdateModal
          onClose={() => setIsRentalModalOpen(false)}
          setClassroomData={setClassroomData}
        />
      )}
    </>
  );
}

export default Search;
