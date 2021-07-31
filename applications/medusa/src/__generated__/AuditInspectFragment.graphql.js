/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AuditPostFragment$ref } from "./AuditPostFragment.graphql";
export type PostAuditLogAction = "Approved" | "Denied" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuditInspectFragment$ref: FragmentReference;
declare export opaque type AuditInspectFragment$fragmentType: AuditInspectFragment$ref;
export type AuditInspectFragment = {|
  +id: string,
  +infractionId: ?string,
  +reason: string,
  +notes: string,
  +reverted: boolean,
  +reversibleUntil: any,
  +action: PostAuditLogAction,
  +$fragmentRefs: AuditPostFragment$ref,
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
      "name": "infractionId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reason",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuditPostFragment"
    }
  ],
  "type": "PostAuditLog",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '15700801a10a7e24352a8cf71c42b176';
module.exports = node;
