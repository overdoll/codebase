/**
 * @generated SignedSource<<15fe88d402e42f928ba245561e3c9b23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostAuditLogAction = "APPROVED" | "DENIED" | "REMOVED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AuditInspectFragment$data = {
  readonly action: PostAuditLogAction;
  readonly notes: string | null;
  readonly post: {
    readonly " $fragmentSpreads": FragmentRefs<"PostPreviewFragment">;
  };
  readonly " $fragmentType": "AuditInspectFragment";
};
export type AuditInspectFragment$key = {
  readonly " $data"?: AuditInspectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuditInspectFragment">;
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
      "name": "notes",
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

(node as any).hash = "bdc736086cbea427c12e1dd87088f018";

export default node;
