"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sensor = void 0;
class Sensor {
    constructor(id, fireCo, reg_date, temperature) {
        this.id = id;
        this.fireCo = fireCo;
        this.reg_date = reg_date;
        this.temperature = temperature;
    }
}
exports.Sensor = Sensor;
