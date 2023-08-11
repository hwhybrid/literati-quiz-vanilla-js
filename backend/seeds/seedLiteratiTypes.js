const { sequelize } = require('../sequelize');
const { LiteratiType } = sequelize.models;
const literatiTypes = require('../../shared/literatiTypesData');

const seedLiteratiTypes = async () => {
    try {
        for (let type of literatiTypes) {
            await LiteratiType.findOrCreate({
                where: { code: type.code },
                defaults: type,
            });
        }

        console.log('LiteratiTypes seeding completed.');
    } catch (error) {
        console.error('Seeding LiteratiTypes failed:', error);
    }
};

module.exports = seedLiteratiTypes;
