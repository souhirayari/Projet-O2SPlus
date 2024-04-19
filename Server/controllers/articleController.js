const db = require("../models");
const Article = db.articles;
const Dossier = db.dossiers;
const Stock = db.stocks;
const Depot = db.depots;

const addArticle = async (req, res) => {
	try {
		const data = {
			Libelle: req.body.Libelle,
		};

		const dossierId = req.body.dossierId;

		if (!dossierId) {
			res.status(400).send("DossierId is required");
			return;
		}

		const dossier = await Dossier.findByPk(dossierId);

		if (!dossier) {
			res.status(400).send("Dossier not found");
			return;
		}

		const article = await Article.create({
			...data,
			dossierId: dossier.id,
		});

		const existingStock = await Stock.findOne({
			where: {
				articleId: article.id,
			},
		});

		if (!existingStock) {
			const mainDepot = await Depot.findOne({
				where: {
					dossierId: dossier.id,
					Principal: true,
				},
			});
			await Stock.create({
				articleId: article.id,
				Quantite: 0,
				depotId: mainDepot.id,
			});
		}

		res.send(article);
	} catch (error) {
		console.error("Error adding article:", error);
	}
};

const getAllAricleByDossier = async (req, res) => {
	try {
		const dossierId = req.params.dossierId;
		if (!dossierId) {
			res.status(400).send("DossierId is required");
			return;
		}

		const dossier = await Dossier.findByPk(dossierId);

		if (!dossier) {
			res.status(400).send("Dossier not found");
			return;
		}

		const articles = await Article.findAll({
			where: {
				dossierId: dossier.id,
			},
		});

		res.send(articles);
	} catch (error) {
		console.error("Error fetching articles:", error);
	}
};

module.exports = {
	addArticle,
	getAllAricleByDossier,
};
