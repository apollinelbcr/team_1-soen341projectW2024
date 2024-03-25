import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { VehiclesLocationsService } from './vehicles_locations.service';
import { Vehicle_Location } from './vehicles_locations.entity';
import { CreateVehicleLocationDto } from './dto/create-locveh.dto';
import { UpdateVehicleLocationDto } from './dto/update-locveh.dto';


const mockLocationsRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

const mockLocation = (id:string = 'unique_id') => ({
  id,
  zip_code: 'H3L3N3',
  airport_name: 'YYU',
  branch_name: 'rentify st-laurent',
  branch_adress: '123 chemin cote-vertu',
  vehicle_id: '3uh4ih848duihodsh9',
});

describe('VehiclesLocationsService', () => {

  let vehicle_location: VehiclesLocationsService;
  let repository: MongoRepository<Vehicle_Location>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesLocationsService,
        {
          provide: getRepositoryToken(Vehicle_Location),
          useFactory: mockLocationsRepository,
        },
      ],
    }).compile();

    vehicle_location = module.get<VehiclesLocationsService>(VehiclesLocationsService);
    repository = module.get<MongoRepository<Vehicle_Location>>(getRepositoryToken(Vehicle_Location));
  });

  it('should be defined', () => {
    expect(vehicle_location).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createVehicleLocation', () => {
    it('should successfully insert a location', async () => {
    const createVehicleLocationDto: CreateVehicleLocationDto = {
        zip_code: 'H4N3L8',
        airport_name: 'WYE',
        branch_name: 'rentify st-catherine',
        branch_adress: '92 bvd sainte-catherine',
        vehicle_id: '73bhg4g5iuhoihlsh'
    };
    jest.spyOn(repository, 'create').mockImplementation(() => mockLocation());
    jest.spyOn(repository, 'save').mockResolvedValue(mockLocation());

      const result = await vehicle_location.createVehicleLocation(createVehicleLocationDto);
      expect(result).toEqual(mockLocation());
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('getVehicleById', () => {
    it('should retrieve a location id', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockLocation('test_id'));

      const result = await vehicle_location.getVehicleLocationById('test_id');
      expect(result).toEqual(mockLocation('test_id'));
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if location is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(vehicle_location.getVehicleLocationById('some_bad_id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllVehicleLocations', () => {

    it('should retrieve vehicle locations by parameter', async () => {
        const mockLocation1: Vehicle_Location = { id: 'hjdjash43kjh', zip_code: '12345', airport_name: 'Test Airport 1', branch_name: 'branch test', branch_adress: 'address test', vehicle_id: 'hadh43giuhd' };
        const mockLocation2: Vehicle_Location = { id: 'sdhjhoh3hljkh', zip_code: '67890', airport_name: 'Test Airport 2', branch_name: 'branch test', branch_adress: 'address test', vehicle_id: 'ihkajsjh4yghosjo'};
    
        jest.spyOn(repository, 'find').mockResolvedValue([mockLocation1, mockLocation2]);
    
        const result = await vehicle_location.getVehicleLocationsByParam('12345');
        expect(result).toHaveLength(2);
        expect(result).toEqual([mockLocation1, mockLocation2]);
        expect(repository.find).toHaveBeenCalledWith({
          where: [{ zip_code: '12345' }, { airport_name: '12345' }],
        });
      });

    it('should throw NotFoundException if no locations found', async () => {
        jest.spyOn(repository, 'find').mockResolvedValue(null);
    
        await expect(vehicle_location.getVehicleLocationsByParam('invalid_param')).rejects.toThrow(NotFoundException);
        expect(repository.find).toHaveBeenCalledWith({
          where: [{ zip_code: 'invalid_param' }, { airport_name: 'invalid_param' }],
        });

  });
  

  describe('deleteVehicleLocation', () => {
    it('should delete the location if it exists', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} as any });

        await vehicle_location.deleteVehicleLocation('test_id');
        expect(repository.delete).toHaveBeenCalledWith('test_id');
    });

    it('should throw NotFoundException if the user does not exist', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: {} as any });

        await expect(vehicle_location.deleteVehicleLocation('some_incorrect_id')).rejects.toThrow(NotFoundException);
    });
});

    describe('updateVehicleLocation', () => {
        it('should update the location details by staff', async () => {
        const updateVehicleLocationDto: UpdateVehicleLocationDto = {
            zip_code:'H5T7G9',
            airport_name: 'YQU',
            branch_name: 'rentify st-catherine',
            branch_adress: '92 bvd sainte-catherine',
            vehicle_id: 'hgh76jhdaig73397'
        };

        jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockLocation());
        jest.spyOn(repository, 'save').mockImplementation((location) => Promise.resolve({ ...location, id: 'test_user_id', zip_code: 'F6R4U7', airport_name: 'YQT', branch_name: 'branch test', branch_adress: 'address test', vehicle_id:'gisajy76auisgi' }));

        const result = await vehicle_location.updateVehicleLocation('test_id', updateVehicleLocationDto);

        expect(result).toMatchObject(updateVehicleLocationDto);
        expect(repository.save).toHaveBeenCalled();
        expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
        });

        it('should throw NotFoundException if the location does not exist', async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

        await expect(vehicle_location.updateVehicleLocation('incorrect_id', {} as UpdateVehicleLocationDto)).rejects.toThrow(NotFoundException);
        });
    });


})
});


