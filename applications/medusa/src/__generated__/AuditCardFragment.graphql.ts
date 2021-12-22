/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostAuditLogAction = "APPROVED" | "DENIED" | "REMOVED" | "%future added value";
export type AuditCardFragment = {
    readonly post: {
        readonly postedAt: unknown | null;
        readonly brand: {
            readonly name: string;
        } | null;
    };
    readonly action: PostAuditLogAction;
    readonly " $fragmentRefs": FragmentRefs<"AuditInspectFragment">;
    readonly " $refType": "AuditCardFragment";
};
export type AuditCardFragment$data = AuditCardFragment;
export type AuditCardFragment$key = {
    readonly " $data"?: AuditCardFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuditCardFragment">;
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
(node as any).hash = '9e72e51c9b7f9787926b7eae7a0d23b1';
export default node;
