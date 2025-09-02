import { api, APIError } from "encore.dev/api";
import { cmsDB } from "./db";

export interface Testimonial {
  id: number;
  name: string;
  company?: string;
  content: string;
  rating: number;
  createdAt: Date;
}

export interface CreateTestimonialRequest {
  name: string;
  company?: string;
  content: string;
  rating: number;
}

export interface UpdateTestimonialRequest {
  id: number;
  name: string;
  company?: string;
  content: string;
  rating: number;
}

export interface ListTestimonialsResponse {
  testimonials: Testimonial[];
}

export interface TestimonialResponse {
  testimonial: Testimonial;
}

// Creates a new testimonial
export const createTestimonial = api<CreateTestimonialRequest, TestimonialResponse>(
  { expose: true, method: "POST", path: "/testimonials" },
  async (req) => {
    const testimonial = await cmsDB.queryRow<Testimonial>`
      INSERT INTO testimonials (name, company, content, rating)
      VALUES (${req.name}, ${req.company}, ${req.content}, ${req.rating})
      RETURNING id, name, company, content, rating, created_at as "createdAt"
    `;
    
    if (!testimonial) {
      throw APIError.internal("Failed to create testimonial");
    }
    
    return { testimonial };
  }
);

// Lists all testimonials
export const listTestimonials = api<void, ListTestimonialsResponse>(
  { expose: true, method: "GET", path: "/testimonials" },
  async () => {
    const testimonials = await cmsDB.queryAll<Testimonial>`
      SELECT id, name, company, content, rating, created_at as "createdAt"
      FROM testimonials
      ORDER BY created_at DESC
    `;
    
    return { testimonials };
  }
);

// Updates a testimonial
export const updateTestimonial = api<UpdateTestimonialRequest, TestimonialResponse>(
  { expose: true, method: "PUT", path: "/admin/testimonials/:id" },
  async (req) => {
    const testimonial = await cmsDB.queryRow<Testimonial>`
      UPDATE testimonials
      SET name = ${req.name}, company = ${req.company}, content = ${req.content}, rating = ${req.rating}
      WHERE id = ${req.id}
      RETURNING id, name, company, content, rating, created_at as "createdAt"
    `;
    
    if (!testimonial) {
      throw APIError.notFound("Testimonial not found");
    }
    
    return { testimonial };
  }
);

// Deletes a testimonial
export const deleteTestimonial = api<{ id: number }, void>(
  { expose: true, method: "DELETE", path: "/admin/testimonials/:id" },
  async ({ id }) => {
    await cmsDB.exec`DELETE FROM testimonials WHERE id = ${id}`;
  }
);
