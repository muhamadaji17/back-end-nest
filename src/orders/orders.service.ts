import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {Sequelize} from 'sequelize-typescript'
import { orders, product, order_detail, users, customer, product_category } from 'models';
import { query } from 'express';

@Injectable()
export class OrdersService {
  constructor(private sequelize: Sequelize){}
 create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() :Promise<any>{
    try {
      const data = await orders.findAll()
      return data
    } catch (error) {
      return error.message
    }
  }

  async createOrders(fields: any): Promise<any> {
    try {
      const order_detail = fields.order_detail;
      let total_quantity: number = 0;
      let total_price: number = 0;

      const id = await users.findByPk(fields.users_id)
      if(id === null){
        throw new Error(`ID ${fields.users_id} Tidak ada`)
      }
  
      for (let i = 0; i < order_detail.length; i++) {
        total_quantity += order_detail[i].quantity;
        let temp_price: any = await product.findByPk(order_detail[i].product_id);
        if (!temp_price) {
          throw new Error(`Product ${order_detail[i].product_id} Tidak di Temukan`);
        }
        let price = temp_price.price * order_detail[i].quantity;
  
        total_price += price;
      }
      const result_order_detail = order_detail.map(({ product_id, quantity }) => ({
        product_id,
        quantity,
      }));
  
      const query = `CALL createOrder(:users_id, :total_product, :total_price, :order_detail)`;
      const replacements = {
        users_id: fields.users_id,
        total_product: total_quantity,
        total_price: total_price,
        order_detail: JSON.stringify(result_order_detail),
      };
  
      const data = await this.sequelize.query(query, { replacements });
  
      return data;
    } catch (error) {
      return error.message;
    }
  }
  
  async getTransaksi():Promise<any>{
    try {
      const data = await customer.findAll({
        attributes: ['first_name', 'last_name'],
        include:[{
          model: users,
          attributes: ['username'],
          include:[{
            model: orders,
            include:[{
              model: order_detail,
              include:[{
                model: product,
                include:[{
                  model:product_category
                }]
              }]
            }]
          }]
          
        }]
      })
      return data
    } catch (error) {
      return error.message
    }
  }

  async findOrderandDetail() :Promise<any>{
    try {
      const query = "SELECT * FROM transaksi"
      const data = await this.sequelize.query(query)
  
      return data
    } catch (error) {
      return error.message
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
