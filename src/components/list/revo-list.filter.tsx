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

export function filterDropdownItems(source: any[], val?: string, dataLabel?: string, filter: Props['filter'] = 'contains') {
  let newSource = [];
  const filterValue = val?.trim()?.toLocaleLowerCase();
  if (!filterValue) {
    newSource = source;
  } else {
    for (let item of source) {
      let val = getItemLabel(item, dataLabel);
      if (typeof val === 'string') {
        val = val.toLocaleLowerCase();
        switch (filter) {
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
    const items = filterDropdownItems(p.source, value, p.dataLabel, p.filter);
    p.onFilterChange({ value, items });
  };

  if (p.autocomplete) {
    p.value = p.filterValue;
  }
  return (
    <input
      class={{ 'filter-box': true }}
      type="text"
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
