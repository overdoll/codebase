/**
 * @generated SignedSource<<e332c6fa6253998dabe35d44efa26f76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewCharacterFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterSmallBannerFragment">;
  readonly " $fragmentType": "PreviewCharacterFragment";
};
export type PreviewCharacterFragment$key = {
  readonly " $data"?: PreviewCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewCharacterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewCharacterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterSmallBannerFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "6cd23f7f07461d7df017078fa990a4e0";

export default node;
