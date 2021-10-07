/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type PostAuditLogAction = "Approved" | "Denied" | "%future added value";
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
    }
  ],
  "type": "PostAuditLog",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '0555b569beb5eb852c0e3c947ec785db';
module.exports = node;
