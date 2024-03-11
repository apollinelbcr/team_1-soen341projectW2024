import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { MongoRepository } from 'typeorm';
import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { NotFoundException } from '@nestjs/common';
import { VehicleStatus } from './vehicle-status.enum';
import { UpdateVehicleStatusDto } from './dto/update-vehicle-status.dto';
import { VehicleTypes } from './vehicle-types.enum';
import { VehicleCategories } from './vehicle-categories.enum';
import { VehicleTransmissions } from './vehicle-transmissions.enum';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: MongoRepository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: MongoRepository,
          useFactory: () => ({
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get<MongoRepository<Vehicle>>(MongoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a vehicle', async () => {
      const createVehicleDto: CreateVehicleDto = {
        name_vehicle: 'Test Vehicle',
        image: 'test-image.jpg',
        vehicle_type: VehicleTypes.SUV,
        vehicle_category: VehicleCategories.COMPACT,
        vehicle_transmission: VehicleTransmissions.MANUAL,
        price: 10000,
      };

      const expectedVehicle: Vehicle = {
            name_vehicle: 'Test Vehicle',
            image: 'test-image.jpg',
            vehicle_type: VehicleTypes.SUV,
            vehicle_category: VehicleCategories.COMPACT,
            vehicle_transmission: VehicleTransmissions.MANUAL,
            price: 10000,
            status: VehicleStatus.AVAILABLE,
            id: 'hhk'
      };

      (repository.create as jest.Mock).mockReturnValue(expectedVehicle);
      (repository.save as jest.Mock).mockResolvedValue(expectedVehicle);

      const result = await service.createTask(createVehicleDto);

      expect(result).toEqual(expectedVehicle);
      expect(repository.create).toBeCalledWith(createVehicleDto);
      expect(repository.save).toBeCalledWith(expectedVehicle);
    });
  });

  describe('getVehicleById', () => {
    beforeEach(() => {
        const expectedId = '123'; // Define expectedId here
      });
      
    it('should get a vehicle by id', async () => {
      const expectedId = '123';
      const expectedVehicle: Vehicle = {
        id: expectedId,
        name_vehicle: 'Test Vehicle',
        image: 'test-image.jpg',
        vehicle_type: VehicleTypes.CAR,
        vehicle_category: VehicleCategories.CLASS_1,
        vehicle_transmission: VehicleTransmissions.MANUAL,
        status: VehicleStatus.AVAILABLE,
        price: 10000,
      };

      (repository.findOne as jest.Mock).mockResolvedValue(expectedVehicle);

      const result = await service.getVehicleById(expectedId);

      expect(result).toEqual(expectedVehicle);
      expect(repository.findOneBy).toBeCalledWith({ id: expectedId });
    });

    it('should throw NotFoundException if vehicle is not found', async () => {
      const nonExistingId = '456';

      (repository.findOneBy as jest.Mock).mockImplementation(async (where: any) => {
        if (where.id === expectedId) {
          return expectedVehicle;
        }
        return null;
      });

      await expect(service.getVehicleById(nonExistingId)).rejects.toThrowError(NotFoundException);
      expect(repository.findOneBy).toBeCalledWith({ id: nonExistingId });
    });
  });

  describe('getAllvehicles', () => {
    it('should return all vehicles', async () => {
      const expectedVehicles: Vehicle[] = [
        {
          id: '1',
          name_vehicle: 'Vehicle 1',
          image: 'image1.jpg',
          vehicle_type: VehicleTypes.CAR,
          vehicle_category: VehicleCategories.SUV,
          vehicle_transmission: VehicleTransmissions.MANUAL,
          status: VehicleStatus.AVAILABLE,
          price: 10000,
        },
        {
          id: '2',
          name_vehicle: 'Vehicle 2',
          image: 'image2.jpg',
          vehicle_type: VehicleTypes.TRUCK,
          vehicle_category: VehicleCategories.PICKUP,
          vehicle_transmission: VehicleTransmissions.AUTOMATIC,
          status: VehicleStatus.UNAVAILABLE,
          price: 15000,
        },
      ];

      (repository.find as jest.Mock).mockResolvedValue(expectedVehicles);

      const result = await service.getAllvehicles();

      expect(result).toEqual(expectedVehicles);
      expect(repository.find).toBeCalled();
    });
  });

  describe('updateVehicleStatus', () => {
    it('should update vehicle status', async () => {
      const vehicleId = '1';
      const newStatus = VehicleStatus.UNAVAILABLE;
      const updatedVehicle: Vehicle = {
        id: vehicleId,
        name_vehicle: 'Vehicle 1',
        image: 'image1.jpg',
        vehicle_type: VehicleTypes.CAR,
        vehicle_category: VehicleCategories.SUV,
        vehicle_transmission: VehicleTransmissions.MANUAL,
        status: newStatus,
        price: 10000,
      };

      (repository.findOneBy as jest.Mock).mockResolvedValue(updatedVehicle);
      (repository.save as jest.Mock).mockResolvedValue(updatedVehicle);

      const result = await service.updateVehicleStatus(vehicleId, newStatus);

      expect(result).toEqual(updatedVehicle);
      expect(repository.findOneBy).toBeCalledWith({ id: vehicleId });
      expect(repository.save).toBeCalledWith(updatedVehicle);
    });
  });

  describe('updateVehicle', () => {
    it('should update vehicle details', async () => {
      const vehicleId = '1';
      const updateVehicleDto: UpdateVehicleStatusDto = {
          name_vehicle: 'Updated Vehicle',
          price: 12000,
          image: 'test.jpg',
          vehicle_type: VehicleTypes.CAR,
          vehicle_category: VehicleCategories.CLASS_2,
          vehicle_transmission: VehicleTransmissions.AUTOMATIC,
          status: "/Users/kaoutarel/Desktop/backup version of admin dashboard that works/team_1-soen341projectW2024/backend/src/vehicles/vehicle-status.enum".AVAILABLE
      };

      const updatedVehicle: Vehicle = {
        id: vehicleId,
        name_vehicle: updateVehicleDto.name_vehicle,
        image: 'image1.jpg',
        vehicle_type: VehicleTypes.CAR,
        vehicle_category: VehicleCategories.LARGE,
        vehicle_transmission: VehicleTransmissions.MANUAL,
        status: VehicleStatus.AVAILABLE,
        price: updateVehicleDto.price,
      };

      (repository.findOneBy as jest.Mock).mockResolvedValue(updatedVehicle);
      (repository.save as jest.Mock).mockResolvedValue(updatedVehicle);

      const result = await service.updateVehicle(vehicleId, updateVehicleDto);

      expect(result).toEqual(updatedVehicle);
      expect(repository.findOneBy).toBeCalledWith({ id: vehicleId });
      expect(repository.save).toBeCalledWith(updatedVehicle);
    });
  });

  describe('deleteVehicle', () => {
    it('should delete a vehicle', async () => {
      const vehicleId = '1';

      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await service.deleteVehicle(vehicleId);

      expect(repository.delete).toBeCalledWith(vehicleId);
    });

    it('should throw NotFoundException if vehicle is not found', async () => {
      const nonExistingId = '456';

      (repository.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      await expect(service.deleteVehicle(nonExistingId)).rejects.toThrowError(NotFoundException);
      expect(repository.delete).toBeCalledWith(nonExistingId);
    });
  });
});
