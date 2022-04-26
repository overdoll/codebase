/**
 * @generated SignedSource<<1e1c47f2158626fdf6f069f3a4f37b9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuickAccessButtonProfileFragment$data = {
  readonly id: string;
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
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "3def39e331459c444453850d055afcb7";

export default node;
