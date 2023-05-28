import { Project } from "../../projects/model/project.model";
import { User } from "../../user/model/user.model";

export interface Contribution {
    id : number,
    worker : User,
    project : Project,
    jobDescription : string,
    jobStartTime : Date,
    jobEndTime : Date
}

export interface ProjectContributionDto {
    project : Project,
    contribution : Contribution,
}