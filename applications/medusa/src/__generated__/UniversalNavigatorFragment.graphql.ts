/**
 * @generated SignedSource<<7bc25299b92758f1425a3333a1cb4bbc>>
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
  readonly " $fragmentSpreads": FragmentRefs<"AlternativeMenuFragment" | "NavigationPopupFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NavigationPopupFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "844a20e9b794b72aeabad81dd529695e";

export default node;
