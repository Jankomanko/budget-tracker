import { defineConfig } from 'prisma/config';

export default defineConfig({
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  datasource: {
    url: 'postgresql://neondb_owner:npg_zTjnk8Pwpv4I@ep-sweet-surf-al8dovvg.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  },
});