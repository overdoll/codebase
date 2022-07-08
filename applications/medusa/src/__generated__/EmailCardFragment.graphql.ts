/**
 * @generated SignedSource<<08ba462ad4182d6388452c36b9e78410>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EmailCardFragment$data = {
  readonly email: string;
  readonly status: AccountEmailStatus;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteFragment" | "MakePrimaryFragment">;
  readonly " $fragmentType": "EmailCardFragment";
};
export type EmailCardFragment$key = {
  readonly " $data"?: EmailCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EmailCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EmailCardFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MakePrimaryFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "AccountEmail",
  "abstractKey": null
};

(node as any).hash = "88b97025cea9859501cfa6ef655c55f8";

export default node;
