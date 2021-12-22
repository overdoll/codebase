/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostAuditLogAction = "APPROVED" | "DENIED" | "REMOVED" | "%future added value";
export type AuditInspectFragment = {
    readonly notes: string | null;
    readonly action: PostAuditLogAction;
    readonly post: {
        readonly " $fragmentRefs": FragmentRefs<"PostPreviewFragment">;
    };
    readonly " $refType": "AuditInspectFragment";
};
export type AuditInspectFragment$data = AuditInspectFragment;
export type AuditInspectFragment$key = {
    readonly " $data"?: AuditInspectFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuditInspectFragment">;
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
(node as any).hash = 'bdc736086cbea427c12e1dd87088f018';
export default node;
