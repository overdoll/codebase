/**
 * @generated SignedSource<<0f5e2c09f276f232decca9d355b41102>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicClubCharacterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubCharacterFragment" | "PublicClubCharacterRichObjectFragment">;
  readonly " $fragmentType": "MetaPublicClubCharacterFragment";
};
export type MetaPublicClubCharacterFragment$key = {
  readonly " $data"?: MetaPublicClubCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicClubCharacterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublicClubCharacterRichObjectFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicClubCharacterFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "ea9d450842ebd12d5ba0b249aee65f83";

export default node;
