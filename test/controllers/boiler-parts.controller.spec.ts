import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { User } from 'src/users/users.model';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthModule } from 'src/auth/auth.module';
import { BoilerPartsModule } from 'src/boiler-parts/boiler-parts.module';

const mockedUser = {
  username: 'Jhon',
  email: 'jhon@gmail.com',
  password: 'jhon123',
};

const objProduct = {
  id: expect.any(Number),
  name: expect.any(String),
  boiler_manufacturer: expect.any(String),
  price: expect.any(Number),
  parts_manufacturer: expect.any(String),
  vendor_code: expect.any(String),
  description: expect.any(String),
  images: expect.any(String),
  in_stock: expect.any(Number),
  bestsellers: expect.any(Boolean),
  new: expect.any(Boolean),
  popularity: expect.any(Number),
  compatibillity: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

describe('Boiler Parts Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // создание тестового app
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        BoilerPartsModule,
        AuthModule,
      ],
    }).compile();

    app = testModule.createNestApplication();

    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  // создание тестового пользователя c mockedUser вместо createUserDto
  beforeEach(async () => {
    const user = new User();
    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);
    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
  });

  it('should get one part', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/boiler-parts/find/1')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.objectContaining({ ...objProduct, id: 1 }),
    );
  });

  it('should get bestsellers', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/boiler-parts/bestsellers')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([{ ...objProduct, bestsellers: true }]),
    );
  });

  it('should get new', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/boiler-parts/new')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([{ ...objProduct, new: true }]),
    );
  });

  it('should search by string', async () => {
    const body = { search: 's' };

    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/boiler-parts/search')
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows.length).toBeLessThanOrEqual(20); // массив rows >= 20 элементов

    response.body.rows.forEach((element: { name: string }) => {
      expect(element.name.toLowerCase()).toContain(body.search);
    });

    expect(response.body.rows).toEqual(
      expect.arrayContaining([{ ...objProduct }]),
    );
  });

  it('should get by name', async () => {
    const body = { name: 'Cum ocer.' };

    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/boiler-parts/name')
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.objectContaining({ ...objProduct, name: body.name }),
    );
  });
});
