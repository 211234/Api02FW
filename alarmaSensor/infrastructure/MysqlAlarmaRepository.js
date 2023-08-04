"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlAlarmaRepository = void 0;
const mysql_1 = require("../../database/mysql");
const Sensor_1 = require("../domain/Sensor");
const WebsocketRouter_1 = require("../../websocket/WebsocketRouter"); // Importa la función para enviar datos actualizados
class MysqlAlarmaRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM esp32";
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataSensor = Object.values(JSON.parse(JSON.stringify(data)));
                return dataSensor.map((datoFire) => new Sensor_1.Sensor(datoFire.id, datoFire.fireCo, datoFire.reg_date, datoFire.temperature));
            }
            catch (error) {
                return null;
            }
        });
    }
    register(fireCo, temperature) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO esp32 (fireco, reg_date, temperature) VALUES (?, ?, ?)";
            const params = [fireCo, temperature];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                const newSensorData = new Sensor_1.Sensor(result.insertId, fireCo, getFormattedDate(), temperature);
                // Envía los datos actualizados a los clientes conectados
                (0, WebsocketRouter_1.sendUpdatedDataToClients)(newSensorData);
                return newSensorData;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MysqlAlarmaRepository = MysqlAlarmaRepository;
// Función para obtener la fecha actual en el formato 'YYYY-MM-DD HH:mm:ss'
function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    return formattedDate;
}
function formatNumber(num) {
    return num < 10 ? `0${num}` : `${num}`;
}
