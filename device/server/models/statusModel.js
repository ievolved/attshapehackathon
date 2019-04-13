

let statusType = {
  HasPower:         false,
  Brewing:          false,
  HasGrind:         false,
  HasFilter:        false,
  HasHeat:          false,
  HasWater:         false,
  Errors:            []
};


let errorType = {
  OK:               [0b000000000000, "OK"],
  Unknown:          [0b100000000000, "Unknown Problem."],
  BadFilter:        [0b000000000001, "Please replace filter."],
  GrindOverflow:    [0b000000000010, "Please reduce the amount of coffee grind."],
  PowerSupply:      [0b000000000100, "Something is wrong with the power."],
  GoTPlaying:       [0b000000001000, "Game of Thrones is on, I'm in do not disturb mode."],
  LidJammed:        [0b000000010000, "Check the lid."],
  Heat:             [0b000000100000, "Unable to heat."],
  Water:            [0b000001000000, "Has water, but clogged or unable to draw from."]
};

const code = 0;
const text = 1;



class StatusManager {
  constructor() {
    this.status = statusType;
    this.error = errorType.OK[code];
  }


  setOK() {
    this.error = errorType.OK[code];
  }

  setErrors(value) {
    //this.setOK();

    if (value.BadFilter === true) {
      this.error |= errorType.BadFilter[code];
    }
    else if (value.BadFilter === false) {
      this.error &= ~(errorType.BadFilter[code]);
    }

    if (value.GrindOverflow === true) {
      this.error |= errorType.GrindOverflow[code];
    }
    else if (value.GrindOverflow === false) {
      this.error &= ~(errorType.GrindOverflow[code]);
    }

    if (value.PowerSupply === true) {
      this.error |= errorType.PowerSupply[code];
    }
    else if (value.PowerSupply === false) {
      this.error &= ~(errorType.PowerSupply[code]);
    }

    if (value.GoTPlaying === true) {
      this.error |= errorType.GoTPlaying[code];
    }
    else if (value.GoTPlaying === false) {
      this.error &= ~(errorType.GoTPlaying[code]);
    }

    if (value.LidJammed === true) {
      this.error |= errorType.LidJammed[code];
    }
    else if (value.LidJammed === false) {
      this.error &= ~(errorType.LidJammed[code]);
    }

    if (value.Heat === true) {
      this.error |= errorType.Heat[code];
    }
    else if (value.Heat === false) {
      this.error &= ~(errorType.Heat[code]);
    }

    if (value.Water === true) {
      this.error |= errorType.Water[code];
    }
    else if (value.Water === false) {
      this.error &= ~(errorType.Water[code]);
    }

    if (this.error > (errorType.Unknown[code] - 1)) {
      this.error = errorType.Unknown[code];
    }
  }

  getErrors() {
    let errors = [];
    let result = this.error;

    if (result === 0) {
      errors.push( [errorType.OK[code], errorType.OK[text]] );
      return errors;
    }

    if (result & errorType.Unknown[code]) {
      errors.push( [errorType.Unknown[code], errorType.Unknown[text]] );
      return errors;
    }

    if (result & errorType.BadFilter[code]) {
      errors.push( [errorType.BadFilter[code], errorType.BadFilter[text]] );
    }

    if (result & errorType.GrindOverflow[code]) {
      errors.push( [errorType.GrindOverflow[code], errorType.GrindOverflow[text]] );
    }

    if (result & errorType.PowerSupply[code]) {
      errors.push( [errorType.PowerSupply[code], errorType.PowerSupply[text]] );
    }

    if (result & errorType.GoTPlaying[code]) {
      errors.push( [errorType.GoTPlaying[code], errorType.GoTPlaying[text]] );
    }

    if (result & errorType.LidJammed[code]) {
      errors.push( [errorType.LidJammed[code], errorType.LidJammed[text]] );
    }

    if (result & errorType.Water[code]) {
      errors.push( [errorType.Water[code], errorType.Water[text]] );
    }

    if (result & errorType.Heat[code]) {
      errors.push( [errorType.Heat[code], errorType.Heat[text]] );
    }

    return errors;
  }

  setStatus(value) {
    let result = value || statusType;

    if (value.HasPower != undefined) {
      result.HasPower = value.HasPower;
    }

    if (value.Brewing != undefined) {
      result.Brewing = value.Brewing;
    }

    if (value.HasGrind != undefined) {
      result.HasGrind = value.HasGrind;
    }

    if (value.HasFilter != undefined) {
      result.HasFilter = value.HasFilter;
    }

    if (value.HasHeat != undefined) {
      result.HasHeat = value.HasHeat;
    }

    if (value.HasWater != undefined) {
      result.HasWater = value.HasWater;
    }

    result.Errors = this.error;
    this.status = result;
  }

  getStatus() {
    let errors = this.getErrors();
    this.status.Errors = errors;

    return this.status;
  }
}



exports.ErrorType = errorType;
exports.StatusType = statusType;
exports.StatusManager = StatusManager;
