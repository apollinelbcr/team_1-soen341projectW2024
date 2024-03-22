import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UserStatus } from './users-status.enum';
import { UserRole } from './users-roles.enum';
import { UpdateUserAdminDto } from './dto/update-user.dto';
import { UpdateCustomerInfoDto } from './dto/update-customer.dto';

// Mock repository functions
const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

const mockUser = (id:string = 'unique_id') => ({
  id,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@gmail.com',
  password: 'testpassword',
  role : UserRole.ADMIN,
  phone_number: '999-999-9999',
  driver_license: 'YHKA-09-827364',
  status: UserStatus.ACTIVE
});

describe('UsersService', () => {
  let user: UsersService;
  let repository: MongoRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    user = module.get<UsersService>(UsersService);
    repository = module.get<MongoRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(user).toBeDefined();
    expect(repository).toBeDefined();
  });

  //create staff
  describe('createStaff', () => {
    it('should successfully insert a staff user', async () => {
    const createStaffDto: CreateStaffDto = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@gmail.com',
        password: 'testpassword35@',
        role : UserRole.CUSTOMER_SERVICE,
        phone_number: '999-999-9999',
        driver_license: 'YHKA-09-827364',
        status: UserStatus.ACTIVE
    };
    jest.spyOn(repository, 'create').mockImplementation(() => mockUser());
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser());

      const result = await user.createStaff(createStaffDto);
      expect(result).toEqual(mockUser());
      expect(repository.save).toHaveBeenCalled();
    });
  });

  //create customer
  describe('createCustomer', () => {
    it('should successfully insert a customer user', async () => {
    const createCustomerDto: CreateCustomerDto = {
        first_name: 'Kate',
        last_name: 'Doe',
        email: 'kate.doe@gmail.com',
        password: 'testpassword1@',
        phone_number: '999-999-9999',
        driver_license: 'YHKA-09-827364'
    };
    jest.spyOn(repository, 'create').mockImplementation(() => mockUser());
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser());
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser());

      const result = await user.createCustomer(createCustomerDto);
      expect(result).toEqual(mockUser());
      expect(repository.save).toHaveBeenCalled();
    });
  });

  //get customer by id
  describe('getCustomerById', () => {
    it('should retrieve a customer by id', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser('test_id'));

      const result = await user.getUserById('test_id');
      expect(result).toEqual(mockUser('test_id'));
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(user.getUserById('some_bad_id')).rejects.toThrow(NotFoundException);
    });
  });

  //get all customers
  describe('getAllCustomers', () => {
    it('should retrieve all customers', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockUser('test_id_1'), mockUser('test_id_2')]);

      const result = await user.getAllUsers();
      expect(result).toHaveLength(2);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  
  //delete users
  describe('deleteUsers', () => {
    it('should delete the user if they exist', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} as any });

        await user.deleteUser('test_id');
        expect(repository.delete).toHaveBeenCalledWith('test_id');
    });

    it('should throw NotFoundException if the user does not exist', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: {} as any });

        await expect(user.deleteUser('some_incorrect_id')).rejects.toThrow(NotFoundException);
    });
});

    //update user -> staff
    describe('updateUserStaff', () => {
        it('should update the user details by staff', async () => {
        const updateUserAdminDto: UpdateUserAdminDto = {
            first_name: 'Lyn',
            last_name: 'Doe',
            email: 'kate.doe@gmail.com',
            password: 'testpassword1@',
            role : UserRole.CUSTOMER,
            phone_number: '999-999-9999',
            driver_license: 'YHKA-09-827364',
            status: UserStatus.INACTIVE
        };

        jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser());
        jest.spyOn(repository, 'save').mockImplementation((user) => Promise.resolve({ ...user, id: 'test_user_id', first_name: 'test', last_name: 'test last', email: 'joe@gmail.com', password: 'somepassword', role: UserRole.ADMIN, phone_number: '999-999-9999', driver_license: 'WLKD-7879-987665', status: UserStatus.ACTIVE }));

        const result = await user.updateUserStaff('test_id', updateUserAdminDto);

        expect(result).toMatchObject(updateUserAdminDto);
        expect(repository.save).toHaveBeenCalled();
        expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
        });

        it('should throw NotFoundException if the user does not exist', async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

        await expect(user.updateUserStaff('incorrect_id', {} as UpdateUserAdminDto)).rejects.toThrow(NotFoundException);
        });
    });

    //update user -> by customer
    describe('updateUserCustomer', () => {
        it('should update the customers details by customers', async () => {
        const updateCustomerInfoDto: UpdateCustomerInfoDto = {
            email: 'kate.doe@gmail.com',
            password: 'testpassword1@',
            phone_number: '999-999-9999',
        };

        jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser());
        jest.spyOn(repository, 'save').mockImplementation((user) => Promise.resolve({ ...user, id: 'test_user_id', first_name: 'test', last_name: 'test last', email: 'joe@gmail.com', password: 'somepassword', role: UserRole.ADMIN, phone_number: '999-999-9999', driver_license: 'WLKD-7879-987665', status: UserStatus.ACTIVE }));

        const result = await user.updateUserCustomer('test_id', updateCustomerInfoDto);

        expect(result).toMatchObject(updateCustomerInfoDto);
        expect(repository.save).toHaveBeenCalled();
        expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'test_id' });
        });

        it('should throw NotFoundException if the customer does not exist', async () => {
        jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

        await expect(user.updateUserCustomer('incorrect_id', {} as UpdateUserAdminDto)).rejects.toThrow(NotFoundException);
        });
    });

});


