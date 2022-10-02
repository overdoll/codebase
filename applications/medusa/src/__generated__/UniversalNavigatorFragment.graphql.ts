/**
 * @generated SignedSource<<06278425db05a58c2a39e284cd6b042a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UniversalNavigatorFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DesktopHorizontalNavigationFragment" | "MobileHorizontalNavigationFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "DesktopHorizontalNavigationFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MobileHorizontalNavigationFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "8d34542e04d4dd0f4b5f5bcf5573e015";

export default node;
