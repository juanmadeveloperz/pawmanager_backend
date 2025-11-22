import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const whiteList = [process.env.FRONTEND_URL];


const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));



app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Servidor funcionando en: ${PORT}`);
});
