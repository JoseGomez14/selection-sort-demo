function parsingDate(motel: TMotel): number {
  const date = new Date(motel.opening_date);
  const time = date.getTime();
  const seconds = time / 1000;
  return seconds;
}

function parsingRate(motel: TMotel): string {
  const { rate } = motel;
  // const rates = ["💛", "💙", "💚", "💜", "❤️‍🔥"];
  const rates = ["🔥", "🔥", "🔥", "🔥", "🔥"];
  let rateString: string = "";

  rateString = rates.slice(0, Math.round(rate)).join("");
  if (rate % 1 <= 0.5 && Math.round(rate) !== 5) {
    // rateString += "❤️‍🩹";
    rateString += "🕯️";
  }
  return rateString;
}

function parsingName(motel: TMotel): [string, string] {
  const { name } = motel;
  const firstLetter = name[0];
  const newName = `${firstLetter}${name.slice(1)}`;
  return [firstLetter, newName];
}

export { parsingDate, parsingRate, parsingName };
