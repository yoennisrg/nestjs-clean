// import mongoose from 'mongoose';
// // import { Sequelize, Model, DataTypes } from 'sequelize';

// interface IPerson {
//   nombre: string;
//   apellidos: string;
// }

// class Person implements IPerson {
//   nombre: string;
//   apellidos: string;

//   constructor(nombre: string, apellidos: string) {
//     this.nombre = nombre;
//     this.apellidos = apellidos;
//   }
// }



// const createMongooseModel = <T>(
//   modelClass: new () => T,
// ): mongoose.Model<mongoose.Document & T> => {
//   const properties = Object.getOwnPropertyDescriptors(modelClass.prototype);
//   const schema = {};
//   for (const [propertyName, propertyDescriptor] of Object.entries(properties)) {
//     if (propertyName !== 'constructor') {
//       schema[propertyName] = {
//         type: propertyDescriptor.value.type,
//         required: propertyDescriptor.value.required,
//       };
//     }
//   }
//   return mongoose.model<mongoose.Document & T>(
//     modelClass.name,
//     new mongoose.Schema(schema),
//   );
// };

// const PersonModel = createMongooseModel<typeof Person>(Person);

// // const createSequelizeModel = <T>(modelClass: new () => T): typeof Model => {
// //     const properties = Object.getOwnPropertyDescriptors(modelClass.prototype);
// //     const attributes = {};
// //     for (const [propertyName, propertyDescriptor] of Object.entries(properties)) {
// //         if (propertyName !== 'constructor') {
// //             attributes[propertyName] = { type: propertyDescriptor.value.type, allowNull: propertyDescriptor.value.allowNull };
// //         }
// //     }
// //     return sequelize.define(modelClass.name, attributes);
// // };
