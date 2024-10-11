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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const databaseConfig_1 = require("./db/databaseConfig");
// Carga de las variables de entorno definidas en el archivo .env hacia process.env
dotenv_1.default.config();
// Instancia de express
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 5000;
// middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
// definicion de rutas
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coffeeShopDB = (0, databaseConfig_1.useDatabase)('coffeeShopDB');
    try {
        const result = yield (coffeeShopDB === null || coffeeShopDB === void 0 ? void 0 : coffeeShopDB.query("SELECT * FROM users"));
        if (result) {
            res.status(200).json({
                message: 'Consulta exitosa',
                data: result
            }); // Envía los resultados al cliente en formato JSON
        }
        else {
            res.status(404).send('No se encontraron usuarios'); // Envía un mensaje si no se encuentran resultados
        }
        console.log(result);
    }
    catch (error) {
        res.status(500).send('Algo salió mal');
        console.error('Error al realizar la consulta:', error);
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
