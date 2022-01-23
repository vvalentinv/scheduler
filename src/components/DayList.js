import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, value, onChange } = props;
  const preparedDays = days.map(d =>
    <DayListItem onClick={() => onChange(d.name)} key={d.id}
      name={d.name} spots={d.spots} selected={value === d.name} />);
  return (
    <ul >
      {preparedDays}
    </ul>
  );
}
