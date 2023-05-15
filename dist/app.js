"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dataRoute_1 = require("./routes/dataRoute");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use('/api', dataRoute_1.route);
const DB = "mongodb://localhost:27017/BBC";
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(DB).then(() => console.log('Database is connected'));
app.listen(5000, () => {
    console.log("server is Running");
});
