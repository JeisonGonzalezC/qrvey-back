import { Request, Response } from 'express';
import { IPersonArgs, PersonModel } from '../models/Person';
import excel from "exceljs";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { IPerson } from '../schemas/PersonSchema';

interface IArgsTable {
    doc: any;
    position: any;
    _id: string;
    name: String;
    username: String;
    email: String;
    company_name: String;
    company_position: String;
}
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

    public async pdf(_req: Request, res: Response) {
        try {
            // Find persons array
            const persons = await PersonModel.index();
            if(!persons){
                res.status(404).json();
                return;
            }
            let doc = new PDFDocument();
            let writeStream = fs.createWriteStream('Persons.pdf');
            doc.pipe(writeStream);
            personController.generateInvoiceTable(doc, persons);

            doc.end();
            res.status(200).json();
        } catch (error) {
            console.error(error)
        }
    }

    public async generateInvoiceTable(doc:any, invoice:IPerson[]) {
        for (let i = 0; i < invoice.length; i++) {
            const item = invoice[i];
            const position = (i + 1) * 30;
            personController.generateTableRow({
                doc,
                position,
                _id: item.id,
                name: item.name,
                username: item.username,
                email: item.email,
                company_name: item.company.name,
                company_position: item.company.position
            });
        }
    }

    public async generateTableRow(args:IArgsTable) {
        const {doc, position: y, _id, company_position, company_name, username} = args;
        doc
          .fontSize(10)
          .text(_id, 100, y)
          .text(username, 300, y, { width: 90, align: "right" })
          .text(company_name, 500, y, { width: 90, align: "right" })
          .text(company_position, 0, y, { align: "right" });
    }
}
export const personController = new PersonController();