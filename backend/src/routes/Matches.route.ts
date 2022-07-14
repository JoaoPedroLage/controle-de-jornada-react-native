import { Request, Response, Router } from 'express';

import JornadaController from '../controllers/Jornada.controller';
import JornadaService from '../services/Jornada.service';

const jornadaController = new JornadaController(new JornadaService());

const jornadaRouter = Router();

jornadaRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await jornadaController.findAll(req, res);
  },
);

jornadaRouter.post(
  '/',
  async (req: Request, res: Response) => {
    await jornadaController.create(req, res);
  },
);

jornadaRouter.patch(
  '/:id',
  async (req: Request, res: Response) => {
    await jornadaController.update(req, res);
  },
);

export default jornadaRouter;
