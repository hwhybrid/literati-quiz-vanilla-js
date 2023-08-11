const { LiteratiType } = require('../sequelize');

exports.getLiteratiTypes = async (req, res) => {
    try {
        const literatiTypes = await LiteratiType.findAll();
        res.status(200).json(literatiTypes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch literati types' });
    }
};
