/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AuditInspectFragment$ref } from "./AuditInspectFragment.graphql";
export type PostAuditLogAction = "Approved" | "Denied" | "Removed" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuditCardFragment$ref: FragmentReference;
declare export opaque type AuditCardFragment$fragmentType: AuditCardFragment$ref;
export type AuditCardFragment = {|
  +reverted: boolean,
  +reversibleUntil: any,
  +contributor: {|
    +username: string
  |},
  +post: {|
    +postedAt: ?any
  |},
  +action: PostAuditLogAction,
  +$fragmentRefs: AuditInspectFragment$ref,
  +$refType: AuditCardFragment$ref,
|};
export type AuditCardFragment$data = AuditCardFragment;
export type AuditCardFragment$key = {
  +$data?: AuditCardFragment$data,
  +$fragmentRefs: AuditCardFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuditCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reverted",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reversibleUntil",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "contributor",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "postedAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "action",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuditInspectFragment"
    }
  ],
  "type": "PostAuditLog",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '2e7e5c0eb171d5a55baad24a9faf084f';
module.exports = node;
