import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.API_PORT || '3001', 10),
  host: process.env.API_HOST || '0.0.0.0',
  
  database: {
    url: process.env.DATABASE_URL || 'postgresql://precatorios_user:precatorios_pass@localhost:5432/precatorios'
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secure-jwt-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },

  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10)
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  },

  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  },

  evolutionApi: {
    url: process.env.EVOLUTION_API_URL || 'http://localhost:8080',
    apiKey: process.env.EVOLUTION_API_KEY || '',
    instanceName: process.env.EVOLUTION_INSTANCE_NAME || 'precatorios-bot'
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '4000', 10),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7')
  },

  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229'
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || 'precatorios-documents'
  },

  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/api.log'
  },

  monitoring: {
    enablePrometheus: process.env.ENABLE_PROMETHEUS === 'true',
    prometheusPort: parseInt(process.env.PROMETHEUS_PORT || '9090', 10)
  },

  webhook: {
    secret: process.env.WEBHOOK_SECRET || 'your-webhook-secret'
  },

  system: {
    timezone: process.env.SYSTEM_TIMEZONE || 'America/Sao_Paulo',
    language: process.env.DEFAULT_LANGUAGE || 'pt-BR'
  },

  leadScoring: {
    hasPrecatorio: parseInt(process.env.LEAD_SCORE_HAS_PRECATORIO || '50', 10),
    eligible: parseInt(process.env.LEAD_SCORE_ELIGIBLE || '25', 10),
    highUrgency: parseInt(process.env.LEAD_SCORE_HIGH_URGENCY || '15', 10),
    hasDocuments: parseInt(process.env.LEAD_SCORE_HAS_DOCUMENTS || '10', 10),
    hotThreshold: parseInt(process.env.LEAD_SCORE_HOT_THRESHOLD || '80', 10),
    warmThreshold: parseInt(process.env.LEAD_SCORE_WARM_THRESHOLD || '50', 10),
    coldThreshold: parseInt(process.env.LEAD_SCORE_COLD_THRESHOLD || '20', 10)
  }
};

// Validate required environment variables
export const validateEnvironment = () => {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (config.env === 'production') {
    const productionRequired = [
      'OPENAI_API_KEY',
      'EVOLUTION_API_KEY',
      'WEBHOOK_SECRET'
    ];

    const missingProduction = productionRequired.filter(key => !process.env[key]);
    
    if (missingProduction.length > 0) {
      console.warn(`Missing production environment variables: ${missingProduction.join(', ')}`);
    }
  }
};