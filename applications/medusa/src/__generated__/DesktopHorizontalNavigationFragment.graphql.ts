/**
 * @generated SignedSource<<179536b822fa5340a0f615b47557cd45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DesktopHorizontalNavigationFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"DesktopAlternativeMenuFragment" | "NavigationPopupFragment">;
  readonly " $fragmentType": "DesktopHorizontalNavigationFragment";
};
export type DesktopHorizontalNavigationFragment$key = {
  readonly " $data"?: DesktopHorizontalNavigationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DesktopHorizontalNavigationFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DesktopHorizontalNavigationFragment",
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
      "name": "DesktopAlternativeMenuFragment"
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

(node as any).hash = "e9e8d1578009c20e6830e1db1fc54697";

export default node;
