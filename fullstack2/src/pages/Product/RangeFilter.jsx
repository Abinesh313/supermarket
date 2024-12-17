  import React from 'react';
  import './Range.css'
  const RangeFilter = ({ min, max, onMinChange, onMaxChange, minLabel, maxLabel }) => {
    const handleMinChange = (e) => {
      onMinChange(parseInt(e.target.value, 10));
    };

    const handleMaxChange = (e) => {
      onMaxChange(parseInt(e.target.value, 10));
    };

    return (
      <div className="range-filter">
        <div className="range-labels">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={min}
          onChange={handleMinChange}
          className="range-slider"
          style={{ width: '100%', margin: '10px 0' }}
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={max}
          onChange={handleMaxChange}
          className="range-slider"
          style={{ width: '100%', margin: '10px 0' }}
        />
      </div>
    );
  };

  export default RangeFilter;
