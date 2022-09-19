/**
 * @generated SignedSource<<0c52eb5a806cf5383ccadb46ec430ecc>>
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
  readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  readonly " $fragmentType": "DropdownMenuButtonProfileFragment";
};
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "AccountIconFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "eb15ca1752bde45abb9e6b1bb82879e9";

export default node;
