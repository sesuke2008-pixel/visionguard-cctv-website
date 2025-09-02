import { api, APIError } from "encore.dev/api";
import { cmsDB } from "./db";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
}

export interface UpdateBlogPostRequest {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
}

export interface ListBlogPostsResponse {
  posts: BlogPost[];
}

export interface BlogPostResponse {
  post: BlogPost;
}

// Creates a new blog post
export const createBlogPost = api<CreateBlogPostRequest, BlogPostResponse>(
  { expose: true, method: "POST", path: "/blog" },
  async (req) => {
    const post = await cmsDB.queryRow<BlogPost>`
      INSERT INTO blog_posts (title, slug, excerpt, content, published, updated_at)
      VALUES (${req.title}, ${req.slug}, ${req.excerpt}, ${req.content}, ${req.published}, NOW())
      RETURNING id, title, slug, excerpt, content, published, created_at as "createdAt", updated_at as "updatedAt"
    `;
    
    if (!post) {
      throw APIError.internal("Failed to create blog post");
    }
    
    return { post };
  }
);

// Lists all blog posts for admin
export const listAllBlogPosts = api<void, ListBlogPostsResponse>(
  { expose: true, method: "GET", path: "/admin/blog" },
  async () => {
    const posts = await cmsDB.queryAll<BlogPost>`
      SELECT id, title, slug, excerpt, content, published, created_at as "createdAt", updated_at as "updatedAt"
      FROM blog_posts
      ORDER BY created_at DESC
    `;
    
    return { posts };
  }
);

// Lists published blog posts for public
export const listPublishedBlogPosts = api<void, ListBlogPostsResponse>(
  { expose: true, method: "GET", path: "/blog" },
  async () => {
    const posts = await cmsDB.queryAll<BlogPost>`
      SELECT id, title, slug, excerpt, content, published, created_at as "createdAt", updated_at as "updatedAt"
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
    `;
    
    return { posts };
  }
);

// Gets a single blog post by slug
export const getBlogPost = api<{ slug: string }, BlogPostResponse>(
  { expose: true, method: "GET", path: "/blog/:slug" },
  async ({ slug }) => {
    const post = await cmsDB.queryRow<BlogPost>`
      SELECT id, title, slug, excerpt, content, published, created_at as "createdAt", updated_at as "updatedAt"
      FROM blog_posts
      WHERE slug = ${slug} AND published = true
    `;
    
    if (!post) {
      throw APIError.notFound("Blog post not found");
    }
    
    return { post };
  }
);

// Updates a blog post
export const updateBlogPost = api<UpdateBlogPostRequest, BlogPostResponse>(
  { expose: true, method: "PUT", path: "/admin/blog/:id" },
  async (req) => {
    const post = await cmsDB.queryRow<BlogPost>`
      UPDATE blog_posts
      SET title = ${req.title}, slug = ${req.slug}, excerpt = ${req.excerpt}, 
          content = ${req.content}, published = ${req.published}, updated_at = NOW()
      WHERE id = ${req.id}
      RETURNING id, title, slug, excerpt, content, published, created_at as "createdAt", updated_at as "updatedAt"
    `;
    
    if (!post) {
      throw APIError.notFound("Blog post not found");
    }
    
    return { post };
  }
);

// Deletes a blog post
export const deleteBlogPost = api<{ id: number }, void>(
  { expose: true, method: "DELETE", path: "/admin/blog/:id" },
  async ({ id }) => {
    await cmsDB.exec`DELETE FROM blog_posts WHERE id = ${id}`;
  }
);
