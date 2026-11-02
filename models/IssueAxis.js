export class IssueAxis {
  constructor({ id, label, left, right, min = 1, max = 7, defaultValue = 4 }) {
    this.id = Number(id);
    this.label = label;
    this.left = left;
    this.right = right;
    this.min = min;
    this.max = max;
    this.defaultValue = defaultValue;
  }

  clamp(val) {
    const num = Number(val);
    if (isNaN(num)) return this.defaultValue;
    return Math.max(this.min, Math.min(this.max, num));
  }
}
