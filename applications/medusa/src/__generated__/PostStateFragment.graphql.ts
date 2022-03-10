/**
 * @generated SignedSource<<bc5772c2e0cb80d331ba3cbfd9b19a34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostStateFragment$data = {
  readonly state: PostState;
  readonly __typename: "Post";
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostFlowFragment">;
  readonly " $fragmentType": "PostStateFragment";
};
export type PostStateFragment = PostStateFragment$data;
export type PostStateFragment$key = {
  readonly " $data"?: PostStateFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostStateFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdatePostFlowFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ee2ae0eaa8cc0dd162751b7125cda7b6";

export default node;
