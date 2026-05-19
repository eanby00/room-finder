import { useState } from 'react';
import Card from '../../components/Card';
import FormField from '../../components/FormField';
import './Search.css';

const TIME_OPTIONS = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

function Search() {
  const [searchCondition, setSearchCondition] = useState({
    useDate: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '13:00',
    capacity: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchCondition((prev) => ({
      ...prev,
      [name]: name === 'capacity' ? Number(value) : value,
    }));
  };

  const handleSearch = () => {
    console.log(searchCondition);
  };

  return (
    <Card title="사용 가능 강의실 후보 검색기">
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

        <FormField label="사용 인원">
          <input
            type="number"
            name="capacity"
            min="0"
            value={searchCondition.capacity}
            onChange={handleChange}
          />
        </FormField>
      </div>

      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </Card>
  );
}

export default Search;
