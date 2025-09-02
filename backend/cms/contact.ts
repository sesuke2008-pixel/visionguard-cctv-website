import { api } from "encore.dev/api";
import { cmsDB } from "./db";

export interface ContactSubmission {
  id: number;
  name: string;
  whatsapp: string;
  needs: string;
  email?: string;
  createdAt: Date;
}

export interface SubmitContactRequest {
  name: string;
  whatsapp: string;
  needs: string;
  email?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ListContactSubmissionsResponse {
  submissions: ContactSubmission[];
}

// Submits a new contact form
export const submitContact = api<SubmitContactRequest, ContactResponse>(
  { expose: true, method: "POST", path: "/contact" },
  async (req) => {
    await cmsDB.exec`
      INSERT INTO contact_submissions (name, whatsapp, needs, email)
      VALUES (${req.name}, ${req.whatsapp}, ${req.needs}, ${req.email})
    `;
    
    return {
      success: true,
      message: "Terima kasih! Kami akan segera menghubungi Anda."
    };
  }
);

// Lists all contact submissions for admin
export const listContactSubmissions = api<void, ListContactSubmissionsResponse>(
  { expose: true, method: "GET", path: "/admin/contact" },
  async () => {
    const submissions = await cmsDB.queryAll<ContactSubmission>`
      SELECT id, name, whatsapp, needs, email, created_at as "createdAt"
      FROM contact_submissions
      ORDER BY created_at DESC
    `;
    
    return { submissions };
  }
);
