import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import {
  SliderBar,
  Info,
  LabelName,
  Value,
} from './Slider.style';
import { colors } from '../../constants/colors';

const Slider = ({
  step,
  min,
  max,
  values,
  onChange,
  label,
}) => {
  return (
    <SliderBar>
      <Info>
        <LabelName>{label}</LabelName>
        <Value>{values[0]}</Value>
      </Info>
      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="wrapper"
            role="button"
          >
            <div
              ref={props.ref}
              className="track"
              style={{
                background: getTrackBackground({
                  values,
                  colors: [colors.accent, '#ccc'],
                  min,
                  max,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className="thumb"
          >
          </div>
        )}
      />
    </SliderBar>
  );
};

export default Slider;
