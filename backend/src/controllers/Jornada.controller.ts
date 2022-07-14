import { Request, Response } from 'express';

export default class jornadaController {
  constructor(private _matchService: any) {}

  public findAll = async (_req: Request, res: Response): Promise<object> => {
    const { inProgress } = _req.query;
    let foundMatch;

    if (inProgress === 'true' || inProgress === 'false') {
      foundMatch = await this._matchService.findAll(inProgress);
    } else foundMatch = await this._matchService.findAll();

    const { code, message, matchesFound } = foundMatch;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(matchesFound);
  };

  public create = async (req: Request, res: Response): Promise<object> => {
    const { authorization } = req.headers;

    const match = await this._matchService.create(req.body, authorization);

    const { code, message, createdMatch } = match;

    if (message) return res.status(code).json({ message });

    return res.status(code).json(createdMatch);
  };


  public update = async (req: Request, res: Response): Promise<object> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await this._matchService.update(homeTeamGoals, awayTeamGoals, Number(id));

    const { code, message } = updatedMatch;

    if (message) return res.status(code).json(message);

    return res.status(code).json(message);
  };
}
