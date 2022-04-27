/**
 * @generated SignedSource<<a1854ece3cae87dc7c8db06ff1556505>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LargeAccountHeaderFragment$data = {
  readonly id: string;
  readonly username: string;
  readonly avatar: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentType": "LargeAccountHeaderFragment";
};
export type LargeAccountHeaderFragment = LargeAccountHeaderFragment$data;
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

(node as any).hash = "6b2b33e8f600279e45594ddecf12fd03";

export default node;
