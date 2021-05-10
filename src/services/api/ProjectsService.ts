import {CreateProjectDTO} from "@nexcella/comein-api";
import {NetworkService} from "../network/NetworkService";

export class ProjectsService extends NetworkService {

  public createProject(data: CreateProjectDTO) {
    return this.transport.request<CreateProjectDTO, any>('POST', '/projects/create', data);
  }

}