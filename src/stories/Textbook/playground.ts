export const playground = () => {
  const multiplyNumeric = (obj: Record<string, unknown>) => {
    for (const objKey in obj) {
      if (typeof obj[objKey] === 'number') {
        (obj[objKey] as number) *= 2;
      }
    }
    return obj;
  };

  let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };

  console.info(multiplyNumeric(menu));
};
