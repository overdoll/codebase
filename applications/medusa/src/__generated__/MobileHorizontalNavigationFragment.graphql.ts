/**
 * @generated SignedSource<<f9f06f5d53f28e71cf7f5df3d4535708>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MobileHorizontalNavigationFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"MobileAlternativeMenuFragment" | "NavigationPopupFragment">;
  readonly " $fragmentType": "MobileHorizontalNavigationFragment";
};
export type MobileHorizontalNavigationFragment$key = {
  readonly " $data"?: MobileHorizontalNavigationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MobileHorizontalNavigationFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MobileHorizontalNavigationFragment",
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
      "name": "MobileAlternativeMenuFragment"
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

(node as any).hash = "6a497f232b31fe4b2fa89624e223cad9";

export default node;
