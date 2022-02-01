/**
 * @generated SignedSource<<7228c7c5ab033d65094ffa6cdbd6a2f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DropdownMenuButtonProfileFragment$data = {
  readonly username: string;
  readonly avatar: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentType": "DropdownMenuButtonProfileFragment";
};
export type DropdownMenuButtonProfileFragment = DropdownMenuButtonProfileFragment$data;
export type DropdownMenuButtonProfileFragment$key = {
  readonly " $data"?: DropdownMenuButtonProfileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DropdownMenuButtonProfileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DropdownMenuButtonProfileFragment",
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

(node as any).hash = "360aba14d2fa06a5c672bf759e028e4b";

export default node;
