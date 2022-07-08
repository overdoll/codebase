/**
 * @generated SignedSource<<a5c4c7d66192e18cc147e4cb86ece0e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostAuditLogAction = "APPROVED" | "DENIED" | "REMOVED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AuditCardFragment$data = {
  readonly action: PostAuditLogAction;
  readonly post: {
    readonly club: {
      readonly name: string;
    };
    readonly postedAt: any | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"AuditInspectFragment">;
  readonly " $fragmentType": "AuditCardFragment";
};
export type AuditCardFragment$key = {
  readonly " $data"?: AuditCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuditCardFragment">;
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
          "concreteType": "Club",
          "kind": "LinkedField",
          "name": "club",
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

(node as any).hash = "cb47292dd216d712c7c127e8b3c0674e";

export default node;
