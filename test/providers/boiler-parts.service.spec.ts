import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { BoilerPartsModule } from 'src/boiler-parts/boiler-parts.module';
import { BoilerPartsService } from 'src/boiler-parts/boiler-parts.service';

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
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

describe('Auth Service', () => {
  let app: INestApplication;
  let boilerPartsService: BoilerPartsService;

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
      ],
    }).compile();

    boilerPartsService = testModule.get<BoilerPartsService>(BoilerPartsService);
    app = testModule.createNestApplication();

    await app.init();
  });

  it('should find by id', async () => {
    const part = await boilerPartsService.findOne(1);

    expect(part.dataValues).toEqual(
      expect.objectContaining({
        ...objProduct,
        id: 1,
      }),
    );
  });

  it('should find by name', async () => {
    const part = await boilerPartsService.findOneByName('Cum ocer.');

    expect(part.dataValues).toEqual(
      expect.objectContaining({
        ...objProduct,
        name: 'Cum ocer.',
      }),
    );
  });

  it('should find by search string', async () => {
    const parts = await boilerPartsService.searchByString('s');

    expect(parts.rows.length).toBeLessThanOrEqual(20); // массив rows >= 20 элементов

    parts.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('s');
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          ...objProduct,
        }),
      );
    });
  });

  it('should find bestsellers parts', async () => {
    const parts = await boilerPartsService.bestsellers();

    parts.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          ...objProduct,
          bestsellers: true,
        }),
      );
    });
  });

  it('should find new parts', async () => {
    const parts = await boilerPartsService.new();

    parts.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          ...objProduct,
          new: true,
        }),
      );
    });
  });
});
