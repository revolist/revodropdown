import { h } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { getItemLabel } from '../../utils/item.helpers';

interface Props extends JSXBase.DOMAttributes<HTMLElement> {
  value?: string;
  filterValue?: string;
  source: any[];
  dataLabel?: string;
  filter?: 'contains' | 'start';
  autocomplete?: string;
  ref?(e: HTMLInputElement): void;
  onInput?(): void;
  onFocus?(): void;
  onClick?(e: MouseEvent): void;
  onFilterChange(e: { value?: string; items: any[] }): void;
}

function doFilter(p: Props, val?: string) {
  let newSource = [];
  const filterValue = val?.trim()?.toLocaleLowerCase();
  if (!filterValue) {
    newSource = p.source;
  } else {
    for (let item of p.source) {
      let val = getItemLabel(item, p.dataLabel);
      if (typeof val === 'string') {
        val = val.toLocaleLowerCase();
        switch (p.filter) {
          case 'start':
            if (val.indexOf(filterValue) === 0) {
              newSource.push(item);
            }
            break;
          default:
            if (val.indexOf(filterValue) > -1) {
              newSource.push(item);
            }
            break;
        }
      }
    }
  }
  return newSource;
}

export const DropdownListFilter = (p: Props) => {
  const filterChange = (value?: string) => {
    const items = doFilter(p, value);
    p.onFilterChange({ value, items });
  };

  if (!p.filter) {
    p.filter = 'contains';
  }
  filterChange(p.filterValue);
  if (p.autocomplete) {
    p.value = p.filterValue;
  }
  return (
    <input class={{ 'filter-box': true, }} type="text"
      {...p}
      onClick={e => {
        e.preventDefault();
        p.onClick && p.onClick(e);
      }}
      onInput={e => {
        p.onInput && p.onInput();
        const value = (e.currentTarget as HTMLInputElement)?.value;
        filterChange(value);
      }}
    />
  );
};
