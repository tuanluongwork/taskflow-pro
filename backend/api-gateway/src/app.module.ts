import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

// Config
import { databaseConfig } from './config/database.config';
import { redisConfig } from './config/redis.config';
import { authConfig } from './config/auth.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig, authConfig],
      envFilePath: ['.env', '.env.local'],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),

    // GraphQL
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: configService.get('NODE_ENV') === 'development',
        debug: configService.get('NODE_ENV') === 'development',
        context: ({ req, res }) => ({ req, res }),
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: any) => {
              const { connectionParams } = context;
              if (connectionParams?.authorization) {
                return { authorization: connectionParams.authorization };
              }
              throw new Error('Missing auth token!');
            },
          },
        },
        formatError: (error) => {
          const graphQLFormattedError = {
            message: error.message,
            code: error.extensions?.code || 'INTERNAL_ERROR',
            timestamp: new Date().toISOString(),
          };
          return graphQLFormattedError;
        },
      }),
      inject: [ConfigService],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),

    // Feature Modules
    AuthModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 