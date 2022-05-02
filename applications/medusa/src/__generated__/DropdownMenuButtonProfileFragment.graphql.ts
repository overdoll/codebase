/**
 * @generated SignedSource<<ab036987dfde268018ca70b180dd724e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DropdownMenuButtonProfileFragment$data = {
  readonly id: string;
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

(node as any).hash = "1704688479f739fdaa741c842fd0d05d";

export default node;
