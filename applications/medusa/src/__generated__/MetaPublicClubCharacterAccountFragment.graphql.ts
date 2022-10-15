/**
 * @generated SignedSource<<44715a4d6205d47f8a94bb1c970b40cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaPublicClubCharacterAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubCharacterAccountFragment">;
  readonly " $fragmentType": "MetaPublicClubCharacterAccountFragment";
};
export type MetaPublicClubCharacterAccountFragment$key = {
  readonly " $data"?: MetaPublicClubCharacterAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaPublicClubCharacterAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaPublicClubCharacterAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerPublicClubCharacterAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "06fb527511b3835ca970df8376fe6097";

export default node;
