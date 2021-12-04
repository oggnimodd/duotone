import React, {
  useState, useRef, useContext, useEffect,
} from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Portal, PortalWithState } from 'react-portal';
import {
  ColorPickerWrapper, TogglePickerButton, Title, Symbol, MobilePicker,
} from './ColorPicker.style';
import useClickOutside from '../../hooks/useClickOutside';
import { CanvasContext } from '../../context/Canvas.context';
import useSizes from '../../hooks/useSizes';

const ColorPickerDesktop = ({
  label, value, element, control,
}) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const mobileRef = useRef(null);

  const { updateValue } = useContext(CanvasContext);
  const { isMedium } = useSizes();

  const changeColor = (val) => {
    updateValue(element, control, val);
  };

  useClickOutside(ref, () => setShow(false), mobileRef);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  return (
    <>
      <Title>{label}</Title>
      <ColorPickerWrapper ref={ref}>
        <TogglePickerButton
          style={{
            backgroundColor: value,
          }}
          disable
          onClick={() => setShow(!show)}
        />
        <Symbol>#</Symbol>
        <HexColorInput
          color={value}
          onClick={!isMedium ? open : null}
          onChange={changeColor}
        />

        {/* On Medium Screen */}
        {
          isMedium && show
          && (
          <HexColorPicker
            color={value}
            onChange={changeColor}
          />
          )
        }
      </ColorPickerWrapper>

      {!isMedium && show && (
        <Portal>
          <div
            ref={mobileRef}
            style={{
              position: 'absolute',
              right: 0,
              bottom: '22%',
              zIndex: 9999,
            }}
          >
            <HexColorPicker
              color={value}
              onChange={changeColor}
            />
          </div>
        </Portal>
      )}
    </>
  );
};

export default ColorPickerDesktop;
