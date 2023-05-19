import { Injectable } from '@nestjs/common';
import { customer, users } from 'models';

@Injectable()
export class CustomersService {
    getAllCustomer() {
        const data = customer.findAll({
            include: users,
            limit: 2
        })
        return data
    }
}
