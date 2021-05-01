import PersonSchema, { IPerson } from '../schemas/PersonSchema';

export interface IPersonArgs {
    _id?: String,
    name: String,
    username: String,
    email: String,
    company: {
        name: String,
        position: String
    }
};

export class PersonModel{
    /**
     * 
     * @returns IPerson[]
     */
    public static async index(): Promise<IPerson[] | undefined>{
        try {
            const persons = await PersonSchema.find();
            return persons;
        } catch (error) {
            console.error(error)
        }
    }
    
    /**
     * args: IPersonArgs
     * @returns IPerson
     */
    public static async save(args: IPersonArgs): Promise<IPerson | undefined>{
        try {
            const newPerson = new PersonSchema(args);
            await newPerson.save();
            return newPerson;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * args: id: string
     * @returns IPerson
     */
    public static async show(id: string): Promise<IPerson | undefined | null>{
        try {
            if(!id){ return undefined; }
            const person = await PersonSchema.findById(id);
            return person;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * args: id: string, args: IPersonArgs
     * @returns IPerson
     */
    public static async update(id: string, args: IPersonArgs): Promise<IPerson | undefined | null>{
        try {
            if(!id){ return undefined; }
            const person = await PersonSchema.findOneAndUpdate({_id: id}, args, {
                new: true
            });
            return person;
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * args: id: string
     * @returns IPerson
     */
    public static async delete(id: string): Promise<IPerson | undefined | null>{
        try {
            if(!id){ return undefined; }
            const person = await PersonSchema.findByIdAndDelete({ _id: id });
            return person;
        } catch (error) {
            console.error(error)
        }
    }
}