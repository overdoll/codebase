/**
 * @generated SignedSource<<823d1f06d818a9a2c3c1b230d5f86d14>>
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
  readonly " $fragmentSpreads": FragmentRefs<"CharacterThumbnailFragment">;
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
      "name": "CharacterThumbnailFragment"
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "2e224ef362bd07008f57700c87946c6f";

export default node;
