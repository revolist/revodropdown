function getItemLabel(item, dataLabel) {
  return dataLabel ? item[dataLabel] : item;
}
function getItemValue(item, dataId) {
  return dataId ? item[dataId] : item;
}

export { getItemLabel as a, getItemValue as g };
