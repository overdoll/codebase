/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostPreviewFragment$ref } from "./PostPreviewFragment.graphql";
export type PostAuditLogAction = "Approved" | "Denied" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuditInspectFragment$ref: FragmentReference;
declare export opaque type AuditInspectFragment$fragmentType: AuditInspectFragment$ref;
export type AuditInspectFragment = {|
  +id: string,
  +notes: string,
  +reverted: boolean,
  +reversibleUntil: any,
  +action: PostAuditLogAction,
  +post: {|
    +$fragmentRefs: PostPreviewFragment$ref
  |},
  +$refType: AuditInspectFragment$ref,
|};
export type AuditInspectFragment$data = AuditInspectFragment;
export type AuditInspectFragment$key = {
  +$data?: AuditInspectFragment$data,
  +$fragmentRefs: AuditInspectFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuditInspectFragment",
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
      "name": "notes",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "action",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostPreviewFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostAuditLog",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'fc4da277d6b0721f1525968a8fd0af26';
module.exports = node;
