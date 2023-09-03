import { EAttribute } from './sorting';
import DataMotels from '../db/motels.json';

function parsingDate(motel: TMotel): number {
  let parts = motel.opening_date.split('/');
  let date = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  const time = date.getTime();
  const seconds = time / 1000;
  const now = new Date().getTime();
  const nowSeconds = now / 1000;
  const diff = seconds - nowSeconds;
  return diff;
}

function parsingRate(motel: TMotel): string {
  const { rate } = motel;
  const rates = ['🔥', '🔥', '🔥', '🔥', '🔥'];
  let rateString: string = '';

  rateString = rates.slice(0, Math.round(rate)).join('');
  if (rate % 1 <= 0.5 && Math.round(rate) !== 5) {
    rateString += '🕯️';
  }
  return rateString;
}

function parsingName(motel: TMotel): [string, string] {
  const { name } = motel;
  const firstLetter = name[0].toUpperCase();
  const newName = `${firstLetter}${name.slice(1)}`;
  return [firstLetter, newName];
}

function parseAttribute(motel: TMotel, attribute: EAttribute): number | string {
  switch (attribute) {
    case EAttribute.DATE:
      return parsingDate(motel);
    case EAttribute.NAME:
      return parsingName(motel)[0];
    default:
      return motel[attribute];
  }
}

function parseData(array: any[]) {
  const motelsInfo = DataMotels.map((motel) => {
    return {
      name: motel.name,
      motelId: motel.id,
      clicks: 0,
      openTime: 0,
    };
  });

  array.forEach((data) => {
    const { motelId, openTime } = data;
    const motel = motelsInfo.find((motel) => motel.motelId === motelId);
    if (motel) {
      motel.clicks += 1;
      motel.openTime += openTime/1000;
    }
  });

  motelsInfo.map((motel) => {
    if (motel.clicks === 0) return motel;
    motel.openTime = motel.openTime / motel.clicks;
    return motel;
  });

  return motelsInfo;
}

export { parsingDate, parsingRate, parsingName, parseAttribute, parseData };
