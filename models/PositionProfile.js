export class PositionProfile {
  constructor(values = [4, 4, 4, 4, 4, 4]) {
    this.values = values.map(v => (v == null || isNaN(v) ? 4 : Number(v)));
  }

  get(axisIndex) {
    return this.values[axisIndex] ?? 4;
  }

  set(axisIndex, value) {
    const copy = [...this.values];
    copy[axisIndex] = Number(value);
    return new PositionProfile(copy);
  }

  calcDistance(otherProfile) {
    if (!otherProfile?.values) return 0;
    const len = Math.max(this.values.length, otherProfile.values.length);
    let diff = 0;
    for (let i = 0; i < len; i++) {
      diff += Math.abs(this.get(i) - otherProfile.get(i));
    }
    return len > 0 ? Number((diff / len).toFixed(2)) : 0;
  }
}
