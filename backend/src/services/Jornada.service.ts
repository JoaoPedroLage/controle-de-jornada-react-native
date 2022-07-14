import MatchModel from '../models/Jornada.model';

export default class MatchService {
  private _matchModel = MatchModel;

  public async findAll(inProgress?: string | undefined) {
    const matchesFound = await this._matchModel.findAll();

    if (!matchesFound) return { code: 401, message: 'Matches not found' };

    return { code: 201, matchesFound };
  }

  public async create(dataReq: any, token: any) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = dataReq;

    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }

    const createdMatch = await this._matchModel.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    return { code: 201, createdMatch };
  }

  public async update(homeTeamGoals: string, awayTeamGoals: string, id:number) {
    const foundMatch = await this._matchModel.findByPk(id);

    if (!foundMatch) return { code: 401, message: 'There is no match with such id!' };

    await this._matchModel.update(
      { inProgress: true, homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return { code: 200, message: 'Match successfully updated' };
  }
}
