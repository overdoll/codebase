/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { DeleteFragment$ref } from "./DeleteFragment.graphql";
import type { MakePrimaryFragment$ref } from "./MakePrimaryFragment.graphql";
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type EmailCardFragment$ref: FragmentReference;
declare export opaque type EmailCardFragment$fragmentType: EmailCardFragment$ref;
export type EmailCardFragment = {|
  +email: string,
  +status: AccountEmailStatus,
  +$fragmentRefs: DeleteFragment$ref & MakePrimaryFragment$ref,
  +$refType: EmailCardFragment$ref,
|};
export type EmailCardFragment$data = EmailCardFragment;
export type EmailCardFragment$key = {
  +$data?: EmailCardFragment$data,
  +$fragmentRefs: EmailCardFragment$ref,
  ...
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
// prettier-ignore
(node: any).hash = '88b97025cea9859501cfa6ef655c55f8';
module.exports = node;
