"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDataAlarmaController = exports.registerDataAlarmaController = exports.getAllDataAlarma = exports.registerDataAlarma = exports.mysqlAlarmaRepository = void 0;
const GetAllDataAlarma_1 = require("../application/GetAllDataAlarma");
const RegisterDataAlarma_1 = require("../application/RegisterDataAlarma");
const GetAllDataAlarmaController_1 = require("./controllers/GetAllDataAlarmaController");
const RegisterDataAlarmaController_1 = require("./controllers/RegisterDataAlarmaController");
const MysqlAlarmaRepository_1 = require("./MysqlAlarmaRepository");
exports.mysqlAlarmaRepository = new MysqlAlarmaRepository_1.MysqlAlarmaRepository();
exports.registerDataAlarma = new RegisterDataAlarma_1.RegisterDataAlarma(exports.mysqlAlarmaRepository);
exports.getAllDataAlarma = new GetAllDataAlarma_1.GetAllDataAlarma(exports.mysqlAlarmaRepository);
exports.registerDataAlarmaController = new RegisterDataAlarmaController_1.RegisterDataAlarmaController(exports.registerDataAlarma);
exports.getAllDataAlarmaController = new GetAllDataAlarmaController_1.GetAllDataAlarmaController(exports.getAllDataAlarma);