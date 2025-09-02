import { api, APIError } from "encore.dev/api";
import { cmsDB } from "./db";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  orderIndex: number;
  createdAt: Date;
}

export interface CreateFAQRequest {
  question: string;
  answer: string;
  orderIndex: number;
}

export interface UpdateFAQRequest {
  id: number;
  question: string;
  answer: string;
  orderIndex: number;
}

export interface ListFAQsResponse {
  faqs: FAQ[];
}

export interface FAQResponse {
  faq: FAQ;
}

// Creates a new FAQ
export const createFAQ = api<CreateFAQRequest, FAQResponse>(
  { expose: true, method: "POST", path: "/faqs" },
  async (req) => {
    const faq = await cmsDB.queryRow<FAQ>`
      INSERT INTO faqs (question, answer, order_index)
      VALUES (${req.question}, ${req.answer}, ${req.orderIndex})
      RETURNING id, question, answer, order_index as "orderIndex", created_at as "createdAt"
    `;
    
    if (!faq) {
      throw APIError.internal("Failed to create FAQ");
    }
    
    return { faq };
  }
);

// Lists all FAQs ordered by order_index
export const listFAQs = api<void, ListFAQsResponse>(
  { expose: true, method: "GET", path: "/faqs" },
  async () => {
    const faqs = await cmsDB.queryAll<FAQ>`
      SELECT id, question, answer, order_index as "orderIndex", created_at as "createdAt"
      FROM faqs
      ORDER BY order_index ASC, created_at ASC
    `;
    
    return { faqs };
  }
);

// Updates a FAQ
export const updateFAQ = api<UpdateFAQRequest, FAQResponse>(
  { expose: true, method: "PUT", path: "/admin/faqs/:id" },
  async (req) => {
    const faq = await cmsDB.queryRow<FAQ>`
      UPDATE faqs
      SET question = ${req.question}, answer = ${req.answer}, order_index = ${req.orderIndex}
      WHERE id = ${req.id}
      RETURNING id, question, answer, order_index as "orderIndex", created_at as "createdAt"
    `;
    
    if (!faq) {
      throw APIError.notFound("FAQ not found");
    }
    
    return { faq };
  }
);

// Deletes a FAQ
export const deleteFAQ = api<{ id: number }, void>(
  { expose: true, method: "DELETE", path: "/admin/faqs/:id" },
  async ({ id }) => {
    await cmsDB.exec`DELETE FROM faqs WHERE id = ${id}`;
  }
);
