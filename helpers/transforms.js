function mapObjectIntoArray(object) {
  if (!Object.keys(object).length) return [];
  return Object.entries(object).map(([_, value]) => value);
}

function mapArrayIntoObject(data) {
  if (!data.length) return {};
  let targetObj = {};
  data.forEach((item) => {
    targetObj[item.id] = item;
  });
  return targetObj;
}

module.exports = {
  mapObjectIntoArray,
  mapArrayIntoObject
};
