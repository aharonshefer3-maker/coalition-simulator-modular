export class Coalition {
  constructor({ parties = [], type = 'normal', blocA = null, blocB = null, brokenDetails = [], taboosBroken = 0, gap = 0 }) {
    this.parties = parties;
    this.type = type;
    this.blocA = blocA;
    this.blocB = blocB;
    this.brokenDetails = brokenDetails;
    this.taboosBroken = taboosBroken;
    this.gap = gap;
  }

  get totalSeats() {
    return this.parties.reduce((acc, p) => acc + (p.seats === '' || isNaN(p.seats) ? 0 : Number(p.seats)), 0);
  }

  get isMajority() {
    return this.totalSeats >= 61;
  }
}
