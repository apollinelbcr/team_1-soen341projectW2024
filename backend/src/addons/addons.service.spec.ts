import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { Addons } from './addons.entity';
import { CreateAddonDto } from './dto/createaddon.dto';
import { UpdateAddonDto } from './dto/updateaddon.dto';

const mockVehicleRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

const mockAddon = (id:string = 'unique_id') => ({
  id,
  addon_name:'smtg',
  price: 5
});

describe('AddonsService', () => {
  let addon: AddonsService;
  let repository: MongoRepository<Addons>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddonsService,
        {
          provide: getRepositoryToken(Addons),
          useFactory: mockVehicleRepository,
        },
      ],
    }).compile();

    addon = module.get<AddonsService>(AddonsService);
    repository = module.get<MongoRepository<Addons>>(getRepositoryToken(Addons));
  });

  it('should be defined', () => {
    expect(addon).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createAddon', () => {
    it('should successfully insert an addon', async () => {
    const ceateAddonDto: CreateAddonDto = {
        addon_name:'addon 1',
        price: 50
    };

    jest.spyOn(repository, 'create').mockImplementation(() => mockAddon());
    jest.spyOn(repository, 'save').mockResolvedValue(mockAddon());

      const result = await addon.createAddon(ceateAddonDto);
      expect(result).toEqual(mockAddon());
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('getAddonById', () => {
    it('should retrieve an addon by id', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockAddon('test_id'));

      const result = await addon.getAddonById('test_id');
      expect(result).toEqual(mockAddon('test_id'));
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if addon is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(addon.getAddonById('bad_id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllAddons', () => {
    it('should return all addons', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockAddon('test_id1'), mockAddon('test_id2')]);

      const result = await addon.getAllAddons();
      expect(result).toHaveLength(2);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('updateAddon', () => {
    it('should update the reservation details', async () => {
      const updateAddonDto: UpdateAddonDto = {
        price: 40
      };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockAddon());
    jest.spyOn(repository, 'save').mockImplementation((addon) => Promise.resolve({ ...addon, id: 'test_id', addon_name: 'test update addon', price: 150 }));

    const result = await addon.updateAddon('test_id', updateAddonDto);

    expect(result).toMatchObject(updateAddonDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if the addon does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(addon.updateAddon('bad_id', {} as UpdateAddonDto)).rejects.toThrow(NotFoundException);
    });
  });

    describe('deleteAddon', () => {
        it('should delete the addon if it exists', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} as any });

            await addon.deleteAddon('test_id');
            expect(repository.delete).toHaveBeenCalledWith('test_id');
        });

        it('should throw NotFoundException if the addon does not exist', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: {} as any });

            await expect(addon.deleteAddon('bad_id')).rejects.toThrow(NotFoundException);
        });
});

});


