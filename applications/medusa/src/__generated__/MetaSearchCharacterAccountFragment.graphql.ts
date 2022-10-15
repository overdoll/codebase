/**
 * @generated SignedSource<<114ee17683d248d27b0641a374e10b4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchCharacterAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCharacterAccountFragment">;
  readonly " $fragmentType": "MetaSearchCharacterAccountFragment";
};
export type MetaSearchCharacterAccountFragment$key = {
  readonly " $data"?: MetaSearchCharacterAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchCharacterAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchCharacterAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchCharacterAccountFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "3105ef06a32f168f7c0c178ab8d065f9";

export default node;
