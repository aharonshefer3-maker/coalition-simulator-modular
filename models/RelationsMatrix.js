export class RelationsMatrix {
  constructor(relationsMap = {}, asymmetricMap = {}) {
    this.relations = { ...relationsMap };
    this.asymmetricPairs = { ...asymmetricMap };
  }

  get(partyAId, partyBId) {
    if (partyAId === partyBId) return 1;
    if (this.asymmetricPairs[`${partyAId}-${partyBId}`]) {
      return this.relations[`${partyAId}-${partyBId}`] ?? 4;
    }
    return this.relations[`${partyAId}-${partyBId}`] ?? 
           this.relations[`${partyBId}-${partyAId}`] ?? 4;
  }

  setSymmetric(partyAId, partyBId, value) {
    const updatedRel = { ...this.relations };
    const updatedAsym = { ...this.asymmetricPairs };

    delete updatedAsym[`${partyAId}-${partyBId}`];
    delete updatedAsym[`${partyBId}-${partyAId}`];

    updatedRel[`${partyAId}-${partyBId}`] = value;
    updatedRel[`${partyBId}-${partyAId}`] = value;

    return new RelationsMatrix(updatedRel, updatedAsym);
  }

  setAsymmetric(partyAId, partyBId, value) {
    const updatedRel = { ...this.relations, [`${partyAId}-${partyBId}`]: value };
    const updatedAsym = { ...this.asymmetricPairs, [`${partyAId}-${partyBId}`]: true };
    return new RelationsMatrix(updatedRel, updatedAsym);
  }

  initParty(newPartyId, allPartyIds) {
    const updatedRel = { ...this.relations };
    allPartyIds.forEach(id => {
      updatedRel[`${newPartyId}-${id}`] = 4;
      updatedRel[`${id}-${newPartyId}`] = 4;
    });
    return new RelationsMatrix(updatedRel, this.asymmetricPairs);
  }
}
