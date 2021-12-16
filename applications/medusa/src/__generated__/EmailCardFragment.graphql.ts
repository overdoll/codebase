/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type EmailCardFragment = {
    readonly email: string;
    readonly status: AccountEmailStatus;
    readonly " $fragmentRefs": FragmentRefs<"DeleteFragment" | "MakePrimaryFragment">;
    readonly " $refType": "EmailCardFragment";
};
export type EmailCardFragment$data = EmailCardFragment;
export type EmailCardFragment$key = {
    readonly " $data"?: EmailCardFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EmailCardFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EmailCardFragment",
  "selections": [
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MakePrimaryFragment"
    }
  ],
  "type": "AccountEmail",
  "abstractKey": null
};
(node as any).hash = '88b97025cea9859501cfa6ef655c55f8';
export default node;
