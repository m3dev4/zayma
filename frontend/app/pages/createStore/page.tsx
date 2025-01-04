'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateStore } from '@/hooks/useStoreQuery';
import { Button } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const CreateStorePage = () => {
  const router = useRouter();
  const [step, setStep] = useState<
    'terms' | 'name' | 'description' | 'logo' | 'summary'
  >('terms');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null as File | null,
  });
  const [previewLogo, setPreviewLogo] = useState<string>('');
  const { mutate: createStore, isPending } = useCreateStore();

  const handleBack = () => {
    if (step === 'terms') {
      router.push('/');
    } else if (step === 'name') {
      setStep('terms');
    } else if (step === 'description') {
      setStep('name');
    } else if (step === 'logo') {
      setStep('description');
    } else if (step === 'summary') {
      setStep('logo');
    }
  };

  const handleContinue = () => {
    if (step === 'terms') {
      if (!acceptTerms) {
        toast.error(
          "Veuillez accepter les conditions d'utilisation pour continuer",
        );
        return;
      }
      setStep('name');
    } else if (step === 'name' && formData.name) {
      setStep('description');
    } else if (step === 'description' && formData.description) {
      setStep('logo');
    } else if (step === 'logo') {
      setStep('summary');
    } else if (step === 'summary') {
      handleSubmit();
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await createStore(formData);
      toast.success('Boutique créée avec succès !');
      router.push('/manage-store');
    } catch (error) {
      console.error('Erreur lors de la création de la boutique:', error);
      toast.error(
        "Une erreur s'est produite lors de la création de la boutique",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {step === 'terms' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              Conditions d'utilisation et Politique de confidentialité
            </h2>
            <div className="h-[60vh] overflow-y-auto pr-4 mb-6 space-y-4 text-gray-700">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Conditions d'utilisation
                </h3>
                1. Acceptation des Conditions En créant une boutique sur [Nom de
                votre application], vous acceptez les présentes Conditions
                d'utilisation. Si vous n'êtes pas d'accord avec ces conditions,
                veuillez ne pas poursuivre la création de votre boutique. 2.
                Responsabilités de l'utilisateur Vous êtes responsable de
                l'exactitude des informations fournies pour la création de votre
                boutique (nom, description, produits, etc.). Vous garantissez
                que tout contenu ajouté à votre boutique (images, textes, etc.)
                respecte les lois en vigueur, y compris celles relatives à la
                propriété intellectuelle. Vous acceptez de gérer directement le
                paiement et la livraison des commandes avec vos clients. 3.
                Utilisation interdite Vous vous engagez à ne pas utiliser la
                plateforme pour : Vendre des produits illégaux, contrefaits ou
                dangereux. Publier du contenu diffamatoire, obscène ou trompeur.
                Contourner les systèmes de sécurité ou perturber le
                fonctionnement de la plateforme. 4. Suspension et résiliation
                Nous nous réservons le droit de suspendre ou de supprimer votre
                boutique en cas de non-respect des présentes Conditions ou de
                comportement abusif. 5. Modifications des Conditions Nous nous
                réservons le droit de modifier ces Conditions à tout moment.
                Vous serez informé des modifications importantes et devrez
                accepter les nouvelles conditions pour continuer à utiliser la
                plateforme.
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold">
                  Politique de confidentialité
                </h3>
                Politique de confidentialité 1. Collecte des informations En
                créant une boutique, nous collectons et stockons les
                informations suivantes : Vos informations personnelles (nom,
                e-mail, numéro de téléphone, etc.). Les informations liées à
                votre boutique (nom, description, produits, etc.). Les
                interactions avec vos clients, y compris les commandes. 2.
                Utilisation des informations Les informations collectées sont
                utilisées pour : Fournir et améliorer nos services. Assurer la
                conformité avec nos Conditions d'utilisation. Vous contacter en
                cas de besoin. 3. Partage des informations Vos informations ne
                seront jamais vendues à des tiers. Cependant, nous pourrions
                partager certaines données avec : Les autorités compétentes en
                cas d'obligation légale. Les prestataires tiers nécessaires à
                l'exploitation de notre plateforme (hébergement, paiement,
                etc.). 4. Sécurité des données Nous mettons en œuvre des mesures
                techniques et organisationnelles pour protéger vos données
                contre tout accès non autorisé, perte ou modification. 5. Vos
                droits Vous avez le droit de : Accéder à vos données
                personnelles. Demander leur modification ou leur suppression.
                Retirer votre consentement à tout moment.
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                id="accept-terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="accept-terms" className="text-sm text-gray-700">
                En cochant cette case, j'accepte les Conditions d'utilisation et
                la Politique de confidentialité
              </label>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Retour
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!acceptTerms}
                className={`px-6 py-2 rounded-lg text-white ${
                  acceptTerms
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 'name' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Nom de la boutique</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border rounded-lg mb-6"
              placeholder="Entrez le nom de votre boutique"
            />
            <div className="flex justify-between">
              <Button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Retour
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!formData.name}
                className={`px-6 py-2 rounded-lg text-white ${
                  formData.name
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 'description' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              Description de la boutique
            </h2>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 border rounded-lg mb-6 h-40 resize-none"
              placeholder="Décrivez votre boutique..."
            />
            <div className="flex justify-between">
              <Button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Retour
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!formData.description}
                className={`px-6 py-2 rounded-lg text-white ${
                  formData.description
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 'logo' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Logo de la boutique</h2>
            <div className="mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg hover:bg-gray-50"
              >
                {previewLogo ? (
                  <Image
                    src={previewLogo}
                    alt="Logo preview"
                    width={150}
                    height={150}
                    className="object-contain h-full"
                  />
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      Cliquez pour ajouter un logo
                    </p>
                  </div>
                )}
              </label>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Retour
              </Button>
              <Button
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 'summary' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Résumé de la boutique</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold">Nom de la boutique</h3>
                <p className="text-gray-600">{formData.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-600">{formData.description}</p>
              </div>
              {previewLogo && (
                <div>
                  <h3 className="font-semibold">Logo</h3>
                  <Image
                    src={previewLogo}
                    alt="Logo preview"
                    width={100}
                    height={100}
                    className="object-contain mt-2"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <Button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Modifier
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                {isPending ? 'Création en cours...' : 'Créer la boutique'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStorePage;
