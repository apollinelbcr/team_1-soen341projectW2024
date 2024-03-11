import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './reservations.entity';
import { MongoRepository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { NotFoundException } from '@nestjs/common';
import { Extras } from "./reservations-extras.enum";

// Mock repository functions
const mockReservationRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

// Mock reservation
const mockReservation = (id:string = 'unique_id') => ({
  id,
  email: 'test@example.com',
  vehicle_name: 'Test Vehicle',
  pickup_date: '2021-04-20',
  pickup_time: '10:00',
  dropoff_date: '2021-04-22',
  dropoff_time: '10:00',
  pickup_location: 'Test Location',
  dropoff_location: 'Test Location',
  price: 100,
  extras: Extras.None
});

describe('ReservationsService', () => {
  let service: ReservationsService;
  let repository: MongoRepository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useFactory: mockReservationRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    repository = module.get<MongoRepository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createTask', () => {
    it('should successfully insert a reservation', async () => {
    const createReservationDto: CreateReservationDto = {
        email: 'test@example.com',
        vehicle_name: 'Test Vehicle',
        pickup_date: new Date('2021-04-20').toISOString(),
        pickup_time: '10:00',
        dropoff_date: new Date('2021-04-22').toISOString(),
        dropoff_time: '10:00',
        pickup_location: 'Test Location',
        dropoff_location: 'Test Location',
        price: 100,
        extras: Extras.None
    };
    jest.spyOn(repository, 'create').mockImplementation(() => mockReservation());
    jest.spyOn(repository, 'save').mockResolvedValue(mockReservation());

      const result = await service.createTask(createReservationDto);
      expect(result).toEqual(mockReservation());
      expect(repository.create).toHaveBeenCalledWith(createReservationDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('getReservationById', () => {
    it('should retrieve a reservation by id', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockReservation('test_id'));

      const result = await service.getReservationById('test_id');
      expect(result).toEqual(mockReservation('test_id'));
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if reservation is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.getReservationById('bad_id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllreservations', () => {
    it('should retrieve all reservations', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockReservation('test_id1'), mockReservation('test_id2')]);

      const result = await service.getAllreservations();
      expect(result).toHaveLength(2);
      expect(repository.find).toHaveBeenCalled();
    });
  });

describe('deleteReservations', () => {
    it('should delete the reservation if it exists', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} as any });

        await service.deleteReservations('test_id');
        expect(repository.delete).toHaveBeenCalledWith('test_id');
    });

    it('should throw NotFoundException if the reservation does not exist', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: {} as any });

        await expect(service.deleteReservations('bad_id')).rejects.toThrow(NotFoundException);
    });
});

  describe('updateVehicle', () => {
    it('should update the reservation details', async () => {
      const updateReservationDto: UpdateReservationDto = {
        email: 'updated@example.com',
        vehicle_name: 'Updated Vehicle',
        pickup_date: '2021-04-21',
        pickup_time: '11:00',
        dropoff_date: '2021-04-23',
        dropoff_time: '11:00',
        pickup_location: 'Updated Location',
        dropoff_location: 'Updated Location',
        price: 150,
        extras: Extras.None
      };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockReservation());
    jest.spyOn(repository, 'save').mockImplementation((reservation) => Promise.resolve({ ...reservation, id: 'test_id', email: 'test@example.com', vehicle_name: 'Test Vehicle', pickup_date: '2021-04-20', pickup_time: '10:00', dropoff_date: '2021-04-22', dropoff_location: 'Updated Location', price: 150, extras: Extras.None, dropoff_time: '11:00', pickup_location: 'Test Location' }));

    const result = await service.updateVehicle('test_id', updateReservationDto);

    expect(result).toMatchObject(updateReservationDto);
      expect(repository.save).toHaveBeenCalled();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if the reservation does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.updateVehicle('bad_id', {} as UpdateReservationDto)).rejects.toThrow(NotFoundException);
    });
  });

});
