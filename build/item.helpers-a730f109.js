function getItemLabel(item, dataLabel) {
  return dataLabel ? item[dataLabel] : item;
}
function getItemValue(item, dataId) {
  return dataId ? item[dataId] : item;
}

export { getItemValue as a, getItemLabel as g };
