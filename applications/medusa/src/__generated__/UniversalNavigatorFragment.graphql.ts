/**
 * @generated SignedSource<<f3acd48570b46daabed06a8c0cf8b1d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UniversalNavigatorFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AlternativeMenuFragment">;
  readonly " $fragmentType": "UniversalNavigatorFragment";
};
export type UniversalNavigatorFragment = UniversalNavigatorFragment$data;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "AlternativeMenuFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b2fe21485e34196bc7a2f619077e12f7";

export default node;
