import { PositionProfile } from './PositionProfile';

export class Party {
  constructor({ id, name, seats = 0, pos = [4, 4, 4, 4, 4, 4] }) {
    this.id = id;
    this.name = name;
    this.seats = seats === '' ? '' : Number(seats);
    this.profile = pos instanceof PositionProfile ? pos : new PositionProfile(pos);
  }

  get activeSeats() {
    return this.seats === '' || isNaN(this.seats) ? 0 : Number(this.seats);
  }

  get isParticipating() {
    return this.activeSeats > 0;
  }
}
