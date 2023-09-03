import { parseAttribute } from './parsing';

enum EOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum EAttribute {
  RATE = 'rate',
  PRICE = 'mean_price',
  NAME = 'name',
  DATE = 'opening_date',
}

function selectionSort(
  arr: TMotel[],
  attribute: EAttribute = EAttribute.RATE,
  order: EOrder = EOrder.ASC,
  parcialOrder?: number,
): TMotel[] {
  let iterations = parcialOrder ? parcialOrder : arr.length;

  let k: number;
  let temp: TMotel;

  for (let i = 0; i < iterations; i++) {
    k = i;

    for (let j = i + 1; j < arr.length; j++) {
      let a = parseAttribute(arr[j], attribute);
      let b = parseAttribute(arr[k], attribute);

      if (order === EOrder.ASC) {
        if (a < b) k = j;
      } else {
        if (a > b) k = j;
      }
    }

    if (k !== i) {
      temp = arr[i];
      arr[i] = arr[k];
      arr[k] = temp;
    }
  }

  return arr;
}

export { selectionSort, EAttribute, EOrder };
