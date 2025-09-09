// Database configuration for VisionGuard CMS
// Using Encore.ts built-in SQL Database with PostgreSQL
// The backend automatically handles database connection and migrations

// Frontend configuration constants
export const config = {
  // Contact information
  whatsapp: {
    number: '+6285129336739',
    businessNumber: '6285129336739'
  },
  
  // Social media
  instagram: {
    username: '@vision_guard.id',
    url: 'https://www.instagram.com/vision_guard.id?igsh=MWUyeXd2b3Z5ZGo1cw=='
  },
  
  // Contact email
  email: 'info@visionguard.co.id',
  
  // Business hours
  businessHours: {
    weekday: '08:00 - 17:00',
    saturday: '08:00 - 14:00',
    sunday: 'Emergency Only'
  },
  
  // Service area
  serviceAreas: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi']
};

// Note: Database connection is handled by Encore.ts backend
// All data is stored in PostgreSQL database managed by Encore.ts
// No additional database configuration needed in frontend
