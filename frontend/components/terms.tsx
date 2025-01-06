/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

const Terms = () => {
  return (
    <div>
      <h2 className="text-2xl font-poppins mb-6 text-white font-semibold">
        Conditions d'utilisation et Politique de confidentialité
      </h2>
      <div className="h-[60vh] overflow-y-auto pr-4 mb-6 space-y-4 font-sans text-white">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Conditions d'utilisation</h3>
          <p className="text-[14px] ">
            1.{' '}
            <span className="font-extrabold">Acceptation des Conditions:</span>{' '}
            En créant une boutique sur Zayma, vous acceptez les présentes
            Conditions d'utilisation. Si vous n'êtes pas d'accord avec ces
            conditions, veuillez ne pas poursuivre la création de votre
            boutique.
          </p>
          <p className="text-[14px]">
            2.{' '}
            <span className="font-extrabold">
              Responsabilités de l'utilisateur:
            </span>{' '}
            Vous êtes responsable de l'exactitude des informations fournies pour
            la création de votre boutique (nom, description, produits, etc.).
            Vous garantissez que tout contenu ajouté à votre boutique (images,
            textes, etc.) respecte les lois en vigueur, y compris celles
            relatives à la propriété intellectuelle. Vous acceptez de gérer
            directement le paiement et la livraison des commandes avec vos
            clients.
          </p>
          <p className="text-[14px]">
            3. <span className="font-extrabold">Utilisation interdite:</span>{' '}
            Vous vous engagez à ne pas utiliser la plateforme pour :{' '}
            <mark>Vendre des produits illégaux, contrefaits ou dangereux.</mark>{' '}
            <mark>
              Publier du contenu diffamatoire, obscène ou trompeur. Contourner
              les systèmes de sécurité ou perturber le fonctionnement de la
              plateforme.
            </mark>
          </p>
          <p className="text-[14px]">
            4.{' '}
            <span className="font-extrabold">Suspension et résiliation:</span>{' '}
            Nous nous réservons le droit de suspendre ou de supprimer votre
            boutique en cas de non-respect des présentes Conditions ou de
            comportement abusif.
          </p>
          <p className="text-[14px]">
            5.{' '}
            <span className="font-extrabold">
              Modifications des Conditions:
            </span>{' '}
            Nous nous réservons le droit de modifier ces Conditions à tout
            moment. Vous serez informé des modifications importantes et devrez
            accepter les nouvelles conditions pour continuer à utiliser la
            plateforme.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Politique de confidentialité
          </h3>
          <p className="text-[14px] ">
            1.{' '}
            <span className="font-extrabold">Collecte des informations:</span>{' '}
            En créant une boutique, nous collectons et stockons les informations
            suivantes : Vos informations personnelles (nom, e-mail, numéro de
            téléphone, etc.). Les informations liées à votre boutique (nom,
            description, produits, etc.). Les interactions avec vos clients, y
            compris les commandes.
          </p>
          <p className="text-[14px]">
            2.{' '}
            <span className="font-extrabold">
              Utilisation des informations:
            </span>{' '}
            Les informations collectées sont utilisées pour : Fournir et
            améliorer nos services. Assurer la conformité avec nos Conditions
            d'utilisation. Vous contacter en cas de besoin.
          </p>
          <p className="text-[14px]">
            3. <span className="font-extrabold">Partage des informations:</span>{' '}
            Vos informations ne seront jamais vendues à des tiers. Cependant,
            nous pourrions partager certaines données avec : Les autorités
            compétentes en cas d'obligation légale. Les prestataires tiers
            nécessaires à l'exploitation de notre plateforme (hébergement,
            paiement, etc.).
          </p>
          <p className="text-[14px]">
            4. <span className="font-extrabold">Sécurité des données:</span>{' '}
            Nous mettons en œuvre des mesures techniques et organisationnelles
            pour protéger vos données contre tout accès non autorisé, perte ou
            modification.
          </p>
          <p className="text-[14px]">
            5.{' '}
            <span className="font-extrabold">
              Vos droits Vous avez le droit de:
            </span>{' '}
            Accéder à vos données personnelles. Demander leur modification ou
            leur suppression. Retirer votre consentement à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
