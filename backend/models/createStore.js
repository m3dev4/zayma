import mongoose from "mongoose";
import slugify from "slugify";

const createStoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: [50, "Le nom ne doit pas dépassé 50 caracteres"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [500, "La description ne doit pas dépassée 500 caracteres"],
    },
    logo: {
      type: String,
      required: [true, "Le logo est requis"],
    },
    link: {
      type: String,
      unique: true,
      lowercase: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware pour générer le lien personnalisé
createStoreSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  this.link = slugify(this.name, {
    lower: true,
    strict: true,
  });

  // Vérification des doublons
  const linkExists = await this.constructor.findOne({
    link: this.link,
    _id: { $ne: this._id },
  });

  if (linkExists) {
    this.link = `${this.link}-${Math.random().toString(36).substr(2, 6)}`;
  }

  next();
});

//Middleware pour vérifier le nombre de boutique par user
createStoreSchema.pre("save", async function (next) {
  if (this.isNew) {
    const storeCount = await this.constructor.countDocuments({
      owner: this.owner,
    });
    if (storeCount >= 3) {
      throw new Error(
        "Un utilisateur ne peut pas créer qu'une seule boutique "
      );
    }
  }
  next();
});

// Index pour améliorer les performances des requêtes
createStoreSchema.index({ owner: 1 });
createStoreSchema.index({ link: 1 }, { unique: true });
createStoreSchema.index({ name: "text", description: "text" });

const createStore = mongoose.model("Store", createStoreSchema);

export default createStore;
