export function getItemLabel<T>(item: T, dataLabel?: string): T|string {
  if (!item) {
    return '';
  }
  return dataLabel ? item[dataLabel] : item;
}

export function getItemValue<T>(item: T, dataId?: string): T {
  return dataId ? item[dataId] : item;
}
