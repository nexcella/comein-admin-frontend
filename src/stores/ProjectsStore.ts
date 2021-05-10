import {makeAutoObservable, runInAction} from "mobx";
import {CreateProjectDTO} from "@nexcella/comein-api";
import {ApiService} from "../services/api/ApiService";
import {ignore} from "mobx-sync";


export class ProjectsStore {
  @ignore
  private apiService: ApiService;

  public loading: boolean = false;

  constructor(apiService: ApiService) {
    makeAutoObservable(this);
    this.apiService = apiService;
  }

  createProject(data: CreateProjectDTO) {
    this.loading = true;
    this.apiService.projects.createProject(data)
      .then((data) => {
        console.debug({data})
      })
      .finally(() => {
        runInAction(() => {
          this.loading = true;
        })
      })
  }

}