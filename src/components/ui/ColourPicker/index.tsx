import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  HexAlphaColorPicker,
  RgbStringColorPicker,
  RgbaStringColorPicker,
  HslStringColorPicker,
  HslaStringColorPicker,
  HsvStringColorPicker,
  HsvaStringColorPicker,
} from 'react-colorful';

import { classList } from '../../classList';
import useClickOutside from '../useClickOutside';
import { NAMED_COLOURS } from './NAMED_COLOURS';

import './ColourPicker.scss';

const baseClass = 'colour-picker';

export type ColourPickerProps = {
  name: string;
  id: string;
  value: string;
  classes?: string;
  onChange?: (value: string) => void;
};

export const ColourPicker: React.FC<PropsWithChildren<ColourPickerProps>> = (
  props
) => {
  // Named colours
  let colour = props.value;
  let namedColour!: string;
  const names = NAMED_COLOURS.map((x) => x.name);
  if (colour && names.includes(colour)) {
    const named = NAMED_COLOURS.find((x) => x.name === colour);
    if (named) {
      namedColour = colour = named.hex;
    }
  }

  // Determine component to use for colour model
  let PickerComponent = HexAlphaColorPicker;
  if (/^rgb/.test(colour)) {
    PickerComponent = RgbaStringColorPicker;
  }
  if (/^hsl/.test(colour)) {
    PickerComponent = HslaStringColorPicker;
  }
  if (/^hsv/.test(colour)) {
    PickerComponent = HsvaStringColorPicker;
  }

  const { name, id, onChange = () => {} } = props;
  const [value, setValue] = useState(colour);
  const [open, setOpen] = useState(false);
  const picker = useRef<HTMLDivElement>(null);

  useClickOutside(picker, () => {
    setOpen(false);
  });

  useEffect(() => {
    onChange(value === namedColour ? props.value : value);
  }, [value]);

  return (
    <div className={classList([baseClass])}>
      <input
        type="text"
        name={name}
        id={id}
        value={value === namedColour ? props.value : value}
        onChange={(e) => setValue(e.target.value)}
        onInput={(e) => setValue((e.target as HTMLInputElement).value)}
        className={`${baseClass}__input`}
      />
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
        }}
        title="Choose colour"
        className={`${baseClass}__btn`}
        style={{ color: value }}
      >
        ▣
      </button>
      <div
        ref={picker}
        className={classList([
          `${baseClass}__picker`,
          open ? `${baseClass}__picker--open` : '',
        ])}
      >
        <PickerComponent color={value} onChange={setValue} />
      </div>
    </div>
  );
};
