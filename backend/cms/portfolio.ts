import { api, APIError } from "encore.dev/api";
import { cmsDB } from "./db";

export interface PortfolioProject {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  projectType: string;
  clientName?: string;
  completionDate?: Date;
  cameraCount?: number;
  createdAt: Date;
}

export interface CreatePortfolioRequest {
  title: string;
  description?: string;
  imageUrl?: string;
  projectType: string;
  clientName?: string;
  completionDate?: Date;
  cameraCount?: number;
}

export interface UpdatePortfolioRequest {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  projectType: string;
  clientName?: string;
  completionDate?: Date;
  cameraCount?: number;
}

export interface ListPortfolioResponse {
  projects: PortfolioProject[];
}

export interface PortfolioResponse {
  project: PortfolioProject;
}

// Creates a new portfolio project
export const createPortfolioProject = api<CreatePortfolioRequest, PortfolioResponse>(
  { expose: true, method: "POST", path: "/portfolio" },
  async (req) => {
    const project = await cmsDB.queryRow<PortfolioProject>`
      INSERT INTO portfolio_projects (title, description, image_url, project_type, client_name, completion_date, camera_count)
      VALUES (${req.title}, ${req.description}, ${req.imageUrl}, ${req.projectType}, ${req.clientName}, ${req.completionDate}, ${req.cameraCount})
      RETURNING id, title, description, image_url as "imageUrl", project_type as "projectType", 
                client_name as "clientName", completion_date as "completionDate", camera_count as "cameraCount", created_at as "createdAt"
    `;
    
    if (!project) {
      throw APIError.internal("Failed to create portfolio project");
    }
    
    return { project };
  }
);

// Lists all portfolio projects
export const listPortfolioProjects = api<void, ListPortfolioResponse>(
  { expose: true, method: "GET", path: "/portfolio" },
  async () => {
    const projects = await cmsDB.queryAll<PortfolioProject>`
      SELECT id, title, description, image_url as "imageUrl", project_type as "projectType", 
             client_name as "clientName", completion_date as "completionDate", camera_count as "cameraCount", created_at as "createdAt"
      FROM portfolio_projects
      ORDER BY completion_date DESC, created_at DESC
    `;
    
    return { projects };
  }
);

// Updates a portfolio project
export const updatePortfolioProject = api<UpdatePortfolioRequest, PortfolioResponse>(
  { expose: true, method: "PUT", path: "/admin/portfolio/:id" },
  async (req) => {
    const project = await cmsDB.queryRow<PortfolioProject>`
      UPDATE portfolio_projects
      SET title = ${req.title}, description = ${req.description}, image_url = ${req.imageUrl}, 
          project_type = ${req.projectType}, client_name = ${req.clientName}, 
          completion_date = ${req.completionDate}, camera_count = ${req.cameraCount}
      WHERE id = ${req.id}
      RETURNING id, title, description, image_url as "imageUrl", project_type as "projectType", 
                client_name as "clientName", completion_date as "completionDate", camera_count as "cameraCount", created_at as "createdAt"
    `;
    
    if (!project) {
      throw APIError.notFound("Portfolio project not found");
    }
    
    return { project };
  }
);

// Deletes a portfolio project
export const deletePortfolioProject = api<{ id: number }, void>(
  { expose: true, method: "DELETE", path: "/admin/portfolio/:id" },
  async ({ id }) => {
    await cmsDB.exec`DELETE FROM portfolio_projects WHERE id = ${id}`;
  }
);
