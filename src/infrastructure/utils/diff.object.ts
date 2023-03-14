type Obj = Record<string, any>;

const isEmpty = (object: Obj): boolean => {
  for (const v in object) {
    if (object.hasOwnProperty(v)) {
      return false;
    }
  }
  return true;
};

export const objectDiff = (defaultObj: Obj, newObj: Obj): Obj => {
  const result: Obj = {};
  for (const v in newObj) {
    if (typeof newObj[v] === 'object') {
      const rsNested = objectDiff(defaultObj[v], newObj[v]);
      if (!isEmpty(rsNested)) {
        result[v] = rsNested;
      }
    } else {
      if (
        !defaultObj ||
        !defaultObj.hasOwnProperty(v) ||
        newObj[v] !== defaultObj[v]
      ) {
        result[v] = newObj[v];
      }
    }
  }
  return result;
};
