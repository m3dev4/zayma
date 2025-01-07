/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

'use client';

import { FileUploadZayma } from '@/components/fileUpload';
import Terms from '@/components/terms';
import { useCreateStore } from '@/hooks/useStoreQuery';
import { Button, Input, Textarea } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CreateStore = () => {
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

  const handleSubmit = async () => {
    try {
      await createStore(formData);
      toast.success('Boutique créée avec succès !');
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la création du boutique');
    }
    toast.error(
      "Une erreur s'est produite lors de la creation du boutique veuillez réessayer",
    );
  };

  return (
    <div className="w-full min-h-screen bg-primary h-full ">
      <div className="p-8 w-full h-full">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-stone-900 to-neutral-900 rouded-xl shadow-lg overflow-hidden">
          {step === 'terms' && (
            <div className="p-8">
              <Terms />
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="accept-terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="accept-terms"
                  className="text-sm font-sans font-semibold text-white"
                >
                  En cochant cette case, j'accepte les Conditions d'utilisation
                  et la Politique de confidentialité
                </label>
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  onClick={handleBack}
                  className="bg-gray-700 cursor-pointer hover:bg-slate-500 text-white py-2 rounded-lg px-6 "
                >
                  Retour
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!acceptTerms}
                  className={`px-6 cursor-pointer py-2 rounded-lg text-white ${
                    acceptTerms
                      ? 'bg-cyan-800 hover:bg-cyan-900'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 'name' && (
            <div className="p-8">
              <h2 className="font-serif text-white text-2xl font-bold mb-6 ">
                Nom de la boutique
              </h2>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Entrez le nom de votre boutique"
                className="w-full p-3 border-none rounded-lg mb-6"
              />
              <div className="flex justify-between">
                <Button
                  className="bg-gray-700
                  cursor-pointer
                  hover:bg-slate-500
                  text-white
                  py-2
                  rounded-lg
                  px-6"
                  onClick={handleBack}
                >
                  Retour
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!formData.name}
                  className={`px-6 cursor-pointer py-2 rounded-lg text-white ${
                    formData.name
                      ? 'bg-cyan-800 hover:bg-cyan-900'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 'description' && (
            <div className="p-8">
              <h2 className="font-serif text-white text-2xl font-bold mb-6 ">
                Description de la boutique
              </h2>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Entrez le nom de votre boutique"
                className="w-full p-3 border-none outline-none rounded-lg mb-6"
              />
              <div className="flex justify-between">
                <Button
                  className="bg-gray-700
                  cursor-pointer
                  hover:bg-slate-500
                  text-white
                  py-2
                  rounded-lg
                  px-6"
                  onClick={handleBack}
                >
                  Retour
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!formData.description}
                  className={`px-6 cursor-pointer py-2 rounded-lg text-white ${
                    formData.description
                      ? 'bg-cyan-800 hover:bg-cyan-900'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 'logo' && (
            <div className="p-8">
              <h2 className="text-2xl font-serif text-white font-bold mb-6">
                Logo de la boutique
              </h2>
              <div className="mb-8">
                <FileUploadZayma
                  onFileSelect={(file) =>
                    setFormData({ ...formData, logo: file })
                  }
                  onPreviewChange={(preview) => setPreviewLogo(preview)}
                />
              </div>
              <div className="flex justify-between">
                <Button
                  className="bg-gray-700 cursor-pointer hover:bg-slate-500 text-white py-2 rounded-lg px-6"
                  onClick={handleBack}
                >
                  Retour
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-2 rounded-lg"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 'summary' && (
            <div className="p-8">
              <h2 className="text-2xl font-serif text-white font-bold mb-6">
                Résumé de la boutique
              </h2>
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-white">
                    Nom de la boutique
                  </h3>
                  <p className="text-gray-300">{formData.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Description</h3>
                  <p className="text-gray-300">{formData.description}</p>
                </div>
                {previewLogo && (
                  <div>
                    <h3 className="font-semibold text-white">Logo</h3>
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
    </div>
  );
};

export default CreateStore;
