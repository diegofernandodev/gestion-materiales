'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Entregas', 'estado', {
      type: Sequelize.ENUM('pendiente', 'completado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Entregas', 'estado');
  }
};
