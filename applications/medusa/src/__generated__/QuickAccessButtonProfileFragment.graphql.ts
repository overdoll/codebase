/**
 * @generated SignedSource<<cf88b1f9c872dc158b626a650c8fa334>>
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
  readonly avatar: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentType": "QuickAccessButtonProfileFragment";
};
export type QuickAccessButtonProfileFragment = QuickAccessButtonProfileFragment$data;
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
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "avatar",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "65af5247a5dcb73fd68149cacc5d7b82";

export default node;
