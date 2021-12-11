/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AuditInspectFragment$ref } from "./AuditInspectFragment.graphql";
export type PostAuditLogAction = "APPROVED" | "DENIED" | "REMOVED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuditCardFragment$ref: FragmentReference;
declare export opaque type AuditCardFragment$fragmentType: AuditCardFragment$ref;
export type AuditCardFragment = {|
  +reverted: boolean,
  +reversibleUntil: any,
  +post: {|
    +postedAt: ?any,
    +brand: ?{|
      +name: string
    |},
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Brand",
          "kind": "LinkedField",
          "name": "brand",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
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
(node: any).hash = 'c2603b7112e7aa8ee3c027b24db29fe9';
module.exports = node;
