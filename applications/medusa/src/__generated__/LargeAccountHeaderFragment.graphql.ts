/**
 * @generated SignedSource<<a53a897b26575ea4910635fd7db82b6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LargeAccountHeaderFragment$data = {
  readonly username: string;
  readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  readonly " $fragmentType": "LargeAccountHeaderFragment";
};
export type LargeAccountHeaderFragment$key = {
  readonly " $data"?: LargeAccountHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LargeAccountHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AccountIconFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "bafe74c9bf38aed6c3d1b4ea748aeab0";

export default node;
