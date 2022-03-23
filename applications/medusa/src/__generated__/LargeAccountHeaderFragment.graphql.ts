/**
 * @generated SignedSource<<ae47288eb01f2481e293a9af30ff7f1d>>
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

(node as any).hash = "87a776b6b96ca4883636090240e8fbcd";

export default node;
