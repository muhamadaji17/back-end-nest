import { Injectable } from '@nestjs/common';
import { customer, users } from 'models';
import {Sequelize} from 'sequelize-typescript'
import * as bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import { Transaction } from 'sequelize';

@Injectable()
export class UsersService {
    constructor(private sequelize: Sequelize){}

    getUser() :string{
        try {
            return `Hallo`
        } catch (error) {
            return error.message
        }
    }

    async getUsersandCust(){
        try {
            const result = await users.findAll({
                include:{
                    model:customer,
                    required: true
                }
            })
            // const query = "SELECT * FROM usersandcust"
            // const data = await this.sequelize.query(query)
            return result
        } catch (error) {
            return error.message
        }   
    }

    async getAllUsers() : Promise <users>{
        try {
            const data: any = await users.findAll()
            return data
            // return `Hai`
        } catch (error) {
            return error.message
        }
    }


    async createUSers(user_fields : any): Promise<any>{
        let result1 :any =''
        let result2 :any =''
        try {
            // console.log(requestBody)
            const salt = await bcrypt.genSalt(10)
            const passHash = await bcrypt.hash(user_fields.password, salt)

            // console.log(passHash)
            const checkUser = await users.findOne({
                where:{
                    username: user_fields.username
                }
            })
            if(checkUser){
                throw new Error('Usernae sudah ada')
            }
             result1 = await users.create({
                username: user_fields.username,
                password: passHash,
                roles: user_fields.roles,
                uuid: uuidv4()
            })

             result2 = await customer.create({
                first_name: user_fields.first_name,
                last_name: user_fields.last_name,
                users_id: result1.id
            })
            return {result1, result2}
        }catch(error) {
            if(result1){
                await users.destroy({
                    where:{
                        id: result1.id
                    }
                })
                return `Gagal`
            }
            return error.message
        }
    }

    async deleteUser(id: number) : Promise<any>{
        try {
            await customer.destroy({
                where:{
                    users_id: id
                }
            })
             await users.destroy({
                where:{
                    id: id

                }
            })
            return id
        } catch (error) {
            return error.message
        }
    }

    async updateUser(fields: any, id: number) :Promise<any>{
        let data1: any = ''
        try {
            const salt = await bcrypt.genSalt(10)
            const passHash = await bcrypt.hash(fields.password, salt)
            const result = await this.sequelize.transaction(async (t) => {
                data1 = await users.update({
                   username: fields.username,
                   password: passHash,
               }, {
                   where:{
                       id:id
                   },
                    transaction: t
                })
                const data2 = await customer.update({
                    first_name: fields.first_name,
                    last_name: fields.last_name
                },{
                    where:{
                        users_id: id
                    },
                    transaction: t
                })
                
            })
            return result
        } catch (error) {
            
            
            return error.message
        }
    }

    async createUserandCust(fields: any) :Promise<any>{
        try {
            const salt = await bcrypt.genSalt(10)
            const passHash = await bcrypt.hash(fields.password, salt)
            fields.password = passHash

            const data = `[${JSON.stringify(fields)}]`
            const query = `CALL public.createcustandusers('${data}')`
            const result = await this.sequelize.query(query)
            return result
        } catch (error) {
            return error.message
        }
    }

    async getById(id:number) : Promise<any> {
        try {
            const data = await users.findOne({
                where:{
                    id:id
                },include:{model:customer}
            })
            if(!data){
                throw new Error("Ga ada" + id + "teresbut")
            }
            
            return data
        } catch (error) {
            return error.message
        }
    }
}
