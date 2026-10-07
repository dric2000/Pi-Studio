import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, ToComplete, type LegalSection } from "@/components/legal/legal-page";
import { CONTACT, LEGAL_UPDATED } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Quelles données π Studio collecte, pourquoi, combien de temps, et comment exercer vos droits.",
};

/*
 * Rédigé au regard de la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données
 * à caractère personnel (autorité de contrôle : ARTCI), et du fonctionnement réel du site :
 * formulaire de contact (Server Action, envoi via Resend si configuré), aucun cookie ni outil de mesure
 * d'audience, polices hébergées localement, vidéos YouTube en mode « nocookie » chargées au clic.
 * À tenir à jour si le site évolue (ajout de statistiques, newsletter…) et à faire valider par un juriste.
 */
const SECTIONS: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <p>
        Les données collectées sur ce site sont traitées par <strong>π Studio</strong>, <ToComplete>adresse du siège</ToComplete>,
        Abidjan, Côte d&apos;Ivoire. Contact : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Données collectées",
    content: (
      <>
        <p>
          <strong>Via le formulaire de contact</strong>, uniquement ce que vous choisissez de nous transmettre :
        </p>
        <ul>
          <li>votre nom et votre adresse email ;</li>
          <li>votre téléphone ou WhatsApp et le nom de votre structure, si vous les indiquez ;</li>
          <li>le type de projet, la fourchette de budget, le délai et votre message.</li>
        </ul>
        <p>
          <strong>Si vous nous écrivez directement</strong> par email ou WhatsApp, nous recevons les informations
          contenues dans votre message.
        </p>
        <p>
          <strong>Lors de la visite du site</strong>, l&apos;hébergeur enregistre des données techniques de connexion
          (adresse IP, type de navigateur, pages demandées), nécessaires au fonctionnement et à la sécurité du site.
          Nous n&apos;utilisons aucun outil de mesure d&apos;audience.
        </p>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Pourquoi nous les utilisons",
    content: (
      <>
        <p>Vos données servent uniquement à :</p>
        <ul>
          <li>répondre à votre demande et échanger sur votre projet ;</li>
          <li>vous adresser une proposition ou un devis, si vous le souhaitez.</li>
        </ul>
        <p>
          Elles ne sont <strong>jamais vendues ni louées</strong>, et ne servent pas à vous envoyer de la publicité sans
          votre accord.
        </p>
      </>
    ),
  },
  {
    id: "base-legale",
    title: "Base légale",
    content: (
      <p>
        Le traitement repose sur votre <strong>consentement</strong>, exprimé lorsque vous nous envoyez votre demande,
        et sur les échanges nécessaires avant la conclusion d&apos;un éventuel contrat avec vous.
      </p>
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires",
    content: (
      <>
        <p>Vos données sont accessibles à l&apos;équipe de π Studio chargée de votre demande, ainsi qu&apos;à nos prestataires techniques, pour le strict nécessaire :</p>
        <ul>
          <li>
            l&apos;hébergeur du site : <ToComplete>nom de l&apos;hébergeur</ToComplete> ;
          </li>
          <li>
            <strong>Resend</strong>, service d&apos;envoi d&apos;emails qui nous transmet le contenu du formulaire ;
          </li>
          <li>
            <strong>WhatsApp</strong> (Meta), uniquement si vous choisissez ce canal pour nous écrire.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "transferts",
    title: "Transferts hors de Côte d'Ivoire",
    content: (
      <p>
        Certains de ces prestataires sont établis hors de Côte d&apos;Ivoire, notamment aux États-Unis. Ces transferts
        sont limités aux données nécessaires au service rendu et encadrés conformément à la loi n° 2013-450 du 19 juin
        2013 : <ToComplete>garanties retenues et, le cas échéant, autorisation de l&apos;ARTCI</ToComplete>.
      </p>
    ),
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    content: (
      <p>
        Les données liées à votre demande sont conservées <ToComplete>ex. 3 ans à compter de notre dernier échange</ToComplete>,
        puis supprimées. Si une collaboration s&apos;engage, les documents contractuels et comptables sont conservés
        pendant les durées prévues par la loi.
      </p>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p>
          Conformément à la loi n° 2013-450, vous disposez d&apos;un droit d&apos;<strong>accès</strong>, de{" "}
          <strong>rectification</strong>, d&apos;<strong>opposition</strong> et de <strong>suppression</strong> de vos
          données. Vous pouvez aussi retirer votre consentement à tout moment.
        </p>
        <p>
          Pour les exercer, écrivez-nous à <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Nous vous
          répondrons dans les meilleurs délais.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l&apos;
          <strong>ARTCI</strong> (Autorité de Régulation des Télécommunications/TIC de Côte d&apos;Ivoire),{" "}
          <a href="https://www.artci.ci" target="_blank" rel="noopener noreferrer">
            artci.ci
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>
          <strong>Ce site ne dépose aucun cookie</strong> de mesure d&apos;audience ou de publicité, et ne stocke
          rien dans votre navigateur. Les polices de caractères sont hébergées sur le site lui-même.
        </p>
        <p>
          Les vidéos YouTube sont intégrées en mode « confidentialité renforcée » et ne se chargent que lorsque vous
          cliquez sur lecture. À ce moment-là, YouTube (Google) peut déposer ses propres cookies, selon sa{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            politique de confidentialité
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    content: (
      <p>
        Le site est servi en connexion chiffrée (HTTPS). L&apos;accès aux demandes reçues est limité aux personnes qui
        en ont besoin pour vous répondre.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "Modifications",
    content: (
      <p>
        Cette politique peut évoluer, notamment si le site change. La date de dernière mise à jour figure en haut de
        page. Voir aussi les <Link href="/mentions-legales">mentions légales</Link>.
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      label="Données personnelles"
      title={["Politique de", <em key="c" className="text-muted-foreground">confidentialité.</em>]}
      updated={LEGAL_UPDATED}
      intro={
        <p>
          En bref : nous ne collectons que ce que vous nous envoyez, pour vous répondre. <em className="text-muted-foreground">Pas de traceur, pas de revente.</em>
        </p>
      }
      sections={SECTIONS}
    />
  );
}
