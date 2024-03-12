import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleStatus } from './vehicle-status.enum';
import { UpdateVehicleStatusDto } from './dto/update-vehicle-status.dto';
import { VehicleTypes } from './vehicle-types.enum';
import { VehicleCategories } from './vehicle-categories.enum';
import { VehicleTransmissions } from './vehicle-transmissions.enum';

import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

// Mock repository functions
const mockVehicleRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

// Mock reservation
const mockVehicle = (id:string = 'unique_id') => ({
  id,
  name_vehicle: 'Test Vehicle',
  image: 'test-image.jpg',
  vehicle_type: VehicleTypes.SUV,
  vehicle_category: VehicleCategories.COMPACT,
  vehicle_transmission: VehicleTransmissions.MANUAL,
  price: 10000,
  status: VehicleStatus.AVAILABLE,
});

describe('VehiclesService', () => {
  let vehicle: VehiclesService;
  let repository: MongoRepository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useFactory: mockVehicleRepository,
        },
      ],
    }).compile();

    vehicle = module.get<VehiclesService>(VehiclesService);
    repository = module.get<MongoRepository<Vehicle>>(getRepositoryToken(Vehicle));
  });

  it('should be defined', () => {
    expect(vehicle).toBeDefined();
    expect(repository).toBeDefined();
  });

  //create vehicle
  describe('createVehicle', () => {
    it('should successfully insert a reservation', async () => {
    const createVehicleDto: CreateVehicleDto = {
        name_vehicle: 'Test Vehicle',
            image: 'test-image.jpg',
            vehicle_type: VehicleTypes.SUV,
            vehicle_category: VehicleCategories.COMPACT,
            vehicle_transmission: VehicleTransmissions.MANUAL,
            price: 10000
    };
    jest.spyOn(repository, 'create').mockImplementation(() => mockVehicle());
    jest.spyOn(repository, 'save').mockResolvedValue(mockVehicle());

      const result = await vehicle.createTask(createVehicleDto);
      expect(result).toEqual(mockVehicle());
      expect(repository.save).toHaveBeenCalled();
    });
  });

  //get vehicle by id
  describe('getVehicleById', () => {
    it('should retrieve a reservation by id', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockVehicle('test_id'));

      const result = await vehicle.getVehicleById('test_id');
      expect(result).toEqual(mockVehicle('test_id'));
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if reservation is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(vehicle.getVehicleById('bad_id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllreservations', () => {
    it('should retrieve all reservations', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockVehicle('test_id1'), mockVehicle('test_id2')]);

      const result = await vehicle.getAllvehicles();
      expect(result).toHaveLength(2);
      expect(repository.find).toHaveBeenCalled();
    });
  });

describe('deleteVehicles', () => {
    it('should delete the reservation if it exists', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} as any });

        await vehicle.deleteVehicle('test_id');
        expect(repository.delete).toHaveBeenCalledWith('test_id');
    });

    it('should throw NotFoundException if the reservation does not exist', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: {} as any });

        await expect(vehicle.deleteVehicle('bad_id')).rejects.toThrow(NotFoundException);
    });
});

    //update vehicle
  describe('updateVehicle', () => {
    it('should update the reservation details', async () => {
      const updateVehicleStatusDto: UpdateVehicleStatusDto = {
        name_vehicle: 'Test Vehicle',
        image: 'test-image.jpg',
        vehicle_type: VehicleTypes.SUV,
        vehicle_category: VehicleCategories.COMPACT,
        vehicle_transmission: VehicleTransmissions.MANUAL,
        price: 10000,
        status: VehicleStatus.AVAILABLE
      };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockVehicle());
    jest.spyOn(repository, 'save').mockImplementation((vehicle) => Promise.resolve({ ...vehicle, id: 'test_id', name_vehicle: 'test', image: 'zzzz.png', vehicle_type: VehicleTypes.CAR, vehicle_category: VehicleCategories.CLASS_1 , vehicle_transmission: VehicleTransmissions.AUTOMATIC, price: 150, status: VehicleStatus.AVAILABLE }));

    const result = await vehicle.updateVehicle('test_id', updateVehicleStatusDto);

    expect(result).toMatchObject(updateVehicleStatusDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if the reservation does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(vehicle.updateVehicle('bad_id', {} as UpdateVehicleStatusDto)).rejects.toThrow(NotFoundException);
    });
  });

});


