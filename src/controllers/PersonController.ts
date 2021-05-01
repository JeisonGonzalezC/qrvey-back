import { Request, Response } from 'express';
import { IPersonArgs, PersonModel } from '../models/Person';
import excel from "exceljs";

class PersonController {
     /**
     * 
     * @returns IPerson[]
     */
    public async index(_req: Request, res: Response) {
        const persons = await PersonModel.index();
        if(persons && persons.length > 0){
            res.status(200).json({
                persons
            });
        }else{
            res.status(404).json();
        }
    }

    /**
     * args: IPersonArgs
     * @returns IPerson
     */
    public async store(req: Request, res: Response) {
        const person = await PersonModel.save(req.body as IPersonArgs);
        if(person){
            res.status(200).json({
                person
            });
        }else{
            res.status(404).json();
        }
    }

    /**
     * args: id: string
     * @returns IPerson
     */
    public async show(req: Request, res: Response) {
        const { id } = req.params;
        const person = await PersonModel.show(id);
        if(person){
            res.status(200).json({
                person
            });
        }else{
            res.status(404).json();
        }
    }

    /**
     * args: id: string, args: IPersonArgs
     * @returns IPerson
     */
    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const person = await PersonModel.update(id, req.body as IPersonArgs);
        if(person){
            res.status(200).json({
                person
            });
        }else{
            res.status(404).json();
        }
    }

    /**
     * args: id: string
     * @returns IPerson
     */
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        const person = await PersonModel.delete(id);
        if(person){
            res.status(200).json({
                person
            });
        }else{
            res.status(404).json();
        }
    }

    /**
     * 
     * @returns Download excel
     */
    public async excel(_req: Request, res: Response) {
        try {
            // Find persons array
            const persons = await PersonModel.index();
            if(!persons){
                res.status(404).json();
                return;
            }
            // Create instance excel
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Persons');
            // Create structure excel
            worksheet.columns = [
                { header: 'Id', key: '_id', width: 10 },
                { header: 'Name', key: 'name', width: 30 },
                { header: 'Username', key: 'username', width: 30},
                { header: 'Email', key: 'email', width: 10}
            ];
            // Add rows to excel
            worksheet.addRows(persons);
            // Write to File
            res.attachment("persons.xlsx");
            // Donwload excel
            workbook.xlsx.write(res)
                .then(function() {
                    res.end()
                });
        } catch (error) {
            console.error(error)
        }
    }
}
export const personController = new PersonController();