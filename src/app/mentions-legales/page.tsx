import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, ToComplete, type LegalSection } from "@/components/legal/legal-page";
import { CONTACT, LEGAL_UPDATED } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergement, propriété intellectuelle et conditions d'utilisation du site π Studio.",
};

/*
 * Rédigé au regard du droit ivoirien (loi n° 2013-546 du 30 juillet 2013 relative aux transactions
 * électroniques). Les blocs « À compléter » attendent les informations officielles du studio.
 * À faire valider par un juriste avant la mise en ligne.
 */
const SECTIONS: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <p>
          Le site est édité par <strong>π Studio</strong> (PYE Studio), studio de production audiovisuelle.
        </p>
        <ul>
          <li>
            Forme juridique et capital : <ToComplete>ex. SARL au capital de … FCFA</ToComplete>
          </li>
          <li>
            Immatriculation : <ToComplete>numéro RCCM</ToComplete>
          </li>
          <li>
            Compte contribuable : <ToComplete>numéro NCC</ToComplete>
          </li>
          <li>
            Siège social : <ToComplete>adresse complète</ToComplete>, Abidjan, Côte d&apos;Ivoire
          </li>
          <li>
            Email : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>
            Téléphone : <ToComplete>numéro officiel du studio</ToComplete>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "publication",
    title: "Directeur de la publication",
    content: (
      <p>
        <ToComplete>nom et qualité du directeur de la publication, a priori le fondateur, Paul Yves Ettien</ToComplete>
      </p>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <p>
        Le site est hébergé par <ToComplete>nom, adresse et téléphone de l&apos;hébergeur retenu</ToComplete>.
      </p>
    ),
  },
  {
    id: "conception",
    title: "Conception et réalisation",
    content: (
      <p>
        Conception, design et développement : <ToComplete>nom et contact du prestataire</ToComplete>.
      </p>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L&apos;ensemble des contenus de ce site (vidéos, photographies, textes, logo π Studio, éléments graphiques)
          est la propriété de π Studio ou de leurs auteurs respectifs, et protégé par le droit de la propriété
          intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite
          préalable de π Studio est interdite. Pour toute demande d&apos;utilisation, écrivez-nous à{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      </>
    ),
  },
  {
    id: "liens",
    title: "Liens externes",
    content: (
      <p>
        Le site renvoie vers des services tiers (réseaux sociaux, YouTube, articles de presse). π Studio n&apos;exerce
        aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou à leurs pratiques en
        matière de données personnelles.
      </p>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    content: (
      <p>
        π Studio s&apos;efforce de fournir des informations exactes et à jour, sans pouvoir le garantir. Les informations
        du site sont données à titre indicatif et peuvent évoluer. π Studio ne saurait être tenu responsable d&apos;une
        interruption du site ou de dommages résultant de son utilisation.
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    content: (
      <p>
        Le traitement des informations transmises via le formulaire de contact est décrit dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable",
    content: (
      <p>
        Les présentes mentions sont régies par le droit ivoirien. En cas de litige, et à défaut de solution amiable,
        les juridictions d&apos;Abidjan sont seules compétentes.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      label="Informations légales"
      title={["Mentions", <em key="l" className="text-muted-foreground">légales.</em>]}
      updated={LEGAL_UPDATED}
      sections={SECTIONS}
    />
  );
}
