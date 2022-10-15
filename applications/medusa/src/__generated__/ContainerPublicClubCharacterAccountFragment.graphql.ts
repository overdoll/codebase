/**
 * @generated SignedSource<<7f521345d64cd64441775f19d11914c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubCharacterAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubCharacterAccountFragment">;
  readonly " $fragmentType": "ContainerPublicClubCharacterAccountFragment";
};
export type ContainerPublicClubCharacterAccountFragment$key = {
  readonly " $data"?: ContainerPublicClubCharacterAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubCharacterAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubCharacterAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollPublicClubCharacterAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fb27faf58f09038129a8f9c8652d41cb";

export default node;
