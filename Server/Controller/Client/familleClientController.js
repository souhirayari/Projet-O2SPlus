const db = require("../../Model/main");
const FamilleClient = db.familleClients;
const Dossier = db.Dossier;
const TypeTarif = db.TypeTarif;
const ModeReglement = db.ModeRegl;
const Vendeur = db.vendeurs;

const addFamilleClient = async (req, res) => {
    try {
        if (auth.user.Role != 'adminDossier') {
            return res.status.send({ message: 'Unanthorized Access' })
        }
        const { Libelle, CodeFamilleClient, dossierId, typeTarifId, modeReglementId, vendeurId } = req.body;

        if (!dossierId) {
            return res.status(400).send("dossierId is required");
        }

        const dossier = await Dossier.findByPk(dossierId);
        if (!dossier) {
            return res.status(400).send("Invalid dossierId");
        }

        const modeReglement = await ModeReglement.findOne({
            where: { idReg: modeReglementId, dossierId: dossierId }
        });
        if (!modeReglement) {
            return res.status(400).send("Invalid modeReglementId");
        }

        const vendeur = await Vendeur.findOne({
            where: { id: vendeurId, dossierId: dossierId }
        });
        if (!vendeur) {
            return res.status(400).send("Invalid vendeurId");
        }

        const typeTarif = await TypeTarif.findOne({
            where: { idTypeTarif: typeTarifId, dossierId: dossierId }
        });
        if (!typeTarif) {
            return res.status(400).send("Invalid typeTarifId");
        }

        let generatedCode = CodeFamilleClient || `Famille Client ${Date.now()}`;
        const existingCode = await FamilleClient.findOne({
            where: { dossierId: dossier.id, CodeFamilleClient: generatedCode }
        });
        if (existingCode) {
            return res.status(400).send("CodeFamilleClient must be unique within the dossier");
        }

        const newFamilleClient = await FamilleClient.create({
            Libelle,
            CodeFamilleClient: generatedCode,
            dossierId,
            idReg: modeReglementId,
            idTypetarif: typeTarifId,
            vendeurId: vendeurId
        });

        res.status(201).send(newFamilleClient);
    } catch (error) {
        console.error("Error adding FamilleClient:", error);
        res.status(500).send("Failed to add FamilleClient");
    }
};

const getFamilleClient = async (req, res) => {
    try {
        if (auth.user.Role != 'adminDossier') {
            return res.status.send({ message: 'Unanthorized Access' })
        }
        const id = req.params.id;
        const familleClient = await FamilleClient.findByPk(id);
        if (!familleClient) {
            return res.status(404).send("Famille Client not found");
        }
        res.status(200).send(familleClient);
    } catch (error) {
        console.error("Error getting FamilleClient:", error);
        res.status(500).send("Failed to get FamilleClient");
    }
};

const getFamilleClientByDossier = async (req, res) => {
    try {
        // Assurez-vous que auth est correctement passé avec req
        // if (auth.user.Role !== 'adminDossier') {
        //     // Utilisez res.status(403).send pour accès non autorisé
        //     return res.status(403).send({ message: 'Unauthorized Access' });
        // }

        const dossierId = req.params.dossierId;

        const familleClient = await FamilleClient.findAll({
            where: { dossierId: dossierId },
            include: [
                {
                    model: TypeTarif,
                    as: 'typeTarif'
                },
                {
                    model: ModeReglement,
                    as: 'modeReglement'
                },
                {
                    model: Vendeur,
                    as: 'vendeur'
                }

            ]
        });

        if (!familleClient || familleClient.length === 0) {
            return res.status(404).send("Famille Client not found");
        }

        res.status(200).send(familleClient);
    } catch (error) {
        console.error("Error getting FamilleClient by Dossier:", error);
        res.status(500).send("Failed to get FamilleClient by Dossier");
    }
};


const deleteFamilleClient = async (req, res) => {
    try {
        if (auth.user.Role != 'adminDossier') {
            return res.status.send({ message: 'Unanthorized Access' })
        }
        const id = req.params.id;
        const familleClient = await FamilleClient.findByPk(id);
        if (!familleClient) {
            return res.status(404).send("Famille Client not found");
        }
        await familleClient.destroy();
        res.status(200).send("Famille Client deleted successfully");
    } catch (error) {
        console.error("Error deleting FamilleClient:", error);
        res.status(500).send("Failed to delete FamilleClient");
    }
};

const updateFamilleClient = async (req, res) => {
    try {
        if (auth.user.Role != 'adminDossier') {
            return res.status.send({ message: 'Unanthorized Access' })
        }
        const id = req.params.id;
        const data = {
            Libelle: req.body.Libelle,
            CodeFamilleClient: req.body.CodeFamilleClient,
            typeTarifId: req.body.typeTarifId,
            modeReglementId: req.body.modeReglementId,
            vendeurId: req.body.vendeurId,
        };

        const familleClient = await FamilleClient.findByPk(id);
        if (!familleClient) {
            return res.status(404).send("Famille Client not found");
        }

        if (data.CodeFamilleClient) {
            const existingCode = await FamilleClient.findOne({
                where: { dossierId: familleClient.dossierId, CodeFamilleClient: data.CodeFamilleClient }
            });
            if (existingCode && existingCode.id !== familleClient.id) {
                return res.status(400).send("CodeFamilleClient must be unique within the dossier");
            }
        }

        if (data.typeTarifId) {
            const existingTypeTarif = await TypeTarif.findByPk(familleClient.typeTarifId);
            const newTypeTarif = await TypeTarif.findOne({
                where: { id: data.typeTarifId, dossierId: familleClient.dossierId }
            });
            if (!newTypeTarif || newTypeTarif.dossierId !== existingTypeTarif.dossierId) {
                throw new Error("Invalid typeTarifId");
            }
        }

        if (data.modeReglementId) {
            const existingModeReglement = await ModeReglement.findByPk(familleClient.modeReglementId);
            const newModeReglement = await ModeReglement.findOne({
                where: { id: data.modeReglementId, dossierId: familleClient.dossierId }
            });
            if (!newModeReglement || newModeReglement.dossierId !== existingModeReglement.dossierId) {
                throw new Error("Invalid modeReglementId");
            }
        }

        if (data.vendeurId) {
            const existingVendeur = await Vendeur.findByPk(familleClient.vendeurId);
            const newVendeur = await Vendeur.findOne({
                where: { id: data.vendeurId, dossierId: familleClient.dossierId }
            });
            if (!newVendeur || newVendeur.dossierId !== existingVendeur.dossierId) {
                throw new Error("Invalid vendeurId");
            }
        }

        await familleClient.update(data);
        res.status(200).send(familleClient);
    } catch (error) {
        console.error("Error updating FamilleClient:", error);
        res.status(400).send(error.message);
    }
};

module.exports = {
    addFamilleClient,
    getFamilleClient,
    getFamilleClientByDossier,
    deleteFamilleClient,
    updateFamilleClient,
};
