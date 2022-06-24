/**
 * @generated SignedSource<<4988fa314328989fc4ab0c5e239be40d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UniversalNavigatorFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"AlternativeMenuFragment">;
  readonly " $fragmentType": "UniversalNavigatorFragment";
};
export type UniversalNavigatorFragment$key = {
  readonly " $data"?: UniversalNavigatorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UniversalNavigatorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UniversalNavigatorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AlternativeMenuFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "73fca635ec5b4133a88b4525299171b5";

export default node;
