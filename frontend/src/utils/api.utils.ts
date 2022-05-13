export const paramStringFromObj = (queryObj: any) => {
  if (!(Object.keys(queryObj)?.length > 0)) return "";

  const res = Object.entries(queryObj).reduce((acc, [key, value]) => {
    let param = "";

    const addToQueryParam = (key: any, value: any) => {
      if (![null, undefined, ""].includes(value)) {
        param += `${key}=${value}&`;
      }
    };

    if (Array.isArray(value)) {
      if (value.length) {
        value.forEach((val) => addToQueryParam(key, val));
      }
    } else {
      addToQueryParam(key, value);
    }
    return acc + param;
  }, "");

  return "?" + res.substring(0, res.length - 1);
};
