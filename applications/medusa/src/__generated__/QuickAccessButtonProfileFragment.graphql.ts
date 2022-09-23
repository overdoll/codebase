/**
 * @generated SignedSource<<0bda673f85a161a6beb45de23fcea30e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuickAccessButtonProfileFragment$data = {
  readonly username: string;
  readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  readonly " $fragmentType": "QuickAccessButtonProfileFragment";
};
export type QuickAccessButtonProfileFragment$key = {
  readonly " $data"?: QuickAccessButtonProfileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuickAccessButtonProfileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickAccessButtonProfileFragment",
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

(node as any).hash = "afdbf2d4918e5f852825d67496fb6aa6";

export default node;
