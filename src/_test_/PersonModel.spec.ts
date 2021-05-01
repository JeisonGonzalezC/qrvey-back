import { PersonModel } from '../models/Person';
import config from '../config/config';
import mongoose from 'mongoose';

const personData = {
    name: 'name1',
    username: 'name1',
    email: `${Math.random().toString(36).substring(7)}@gmail.com`,
    company: {
        name: 'name1',
        position: 'name1'
    },
}
describe('Person Model', () => {
    beforeAll(async () => {
        const url = config.DB_CONNECTION;
        await mongoose.connect(url, { 
            useNewUrlParser: true ,
            useUnifiedTopology: true
        })
    })
    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close()
        done()
      })
    it('Función index', async() => {
        const persons = await PersonModel.index();
        if(persons && persons.length > 0){
            expect(persons).not.toBeNull();
            expect(persons).toBeDefined();
            expect(persons[0].name).not.toBeNull();
            expect(persons[0].username).toBeDefined();
        }
    });

    it('Función store', async() => {
        const data = {
            ...personData,
            email: `${Math.random().toString(36).substring(7)}@gmail.com`,
        }
        const person = await PersonModel.save(data);
        if(person){
            expect(person).not.toBeNull();
            expect(person).toBeDefined();
            expect(personData.name).toBe(person.name);
            expect(personData.username).toBe(person.username);
            expect(data.email).toBe(person.email);
        }
    });

    it('Función show', async() => {
        const data = {
            ...personData,
            email: `${Math.random().toString(36).substring(7)}@gmail.com`,
        }
        const personSave = await PersonModel.save(data);
        if(personSave){
            expect(personSave).not.toBeNull();
            expect(personSave).toBeDefined();
            expect(personData.name).toBe(personSave.name);
            expect(personData.username).toBe(personSave.username);
            expect(data.email).toBe(personSave.email);

            const person = await PersonModel.show(personSave._id as string);
            if(person){
                expect(person).not.toBeNull();
                expect(person).toBeDefined();
                expect(person.name).not.toBeNull();
                expect(person.username).toBeDefined();
            }
        }
    });

    it('Función update', async() => {
        const data = {
            ...personData,
            email: `${Math.random().toString(36).substring(7)}@gmail.com`,
        }
        const personSave = await PersonModel.save(data);
        if(personSave){
            expect(personSave).not.toBeNull();
            expect(personSave).toBeDefined();
            expect(personData.name).toBe(personSave.name);
            expect(personData.username).toBe(personSave.username);
            expect(data.email).toBe(personSave.email);

            const update = await PersonModel.update(personSave._id as string || '', {
                ...personSave,
                name: 'Editado',
                company: {
                    name: personSave.company.name,
                    position: 'posición editada'
                }
            });
            if(update){
                expect(update).not.toBeNull();
                expect(update).toBeDefined();
                expect(update.name).not.toBeNull();
                expect(update.username).toBeDefined();
            }
        }
    });

    it('Función delete', async() => {
        const data = {
            ...personData,
            email: `${Math.random().toString(36).substring(7)}@gmail.com`,
        }
        const personSave = await PersonModel.save(data);
        if(personSave){
            expect(personSave).not.toBeNull();
            expect(personSave).toBeDefined();
            expect(personData.name).toBe(personSave.name);
            expect(personData.username).toBe(personSave.username);
            expect(data.email).toBe(personSave.email);

            const deletePerson = await PersonModel.delete(personSave._id as string);
            if(deletePerson){
                expect(deletePerson).not.toBeNull();
                expect(deletePerson).toBeDefined();
                expect(deletePerson.name).not.toBeNull();
                expect(deletePerson.username).toBeDefined();
            }
        }
    });
});
