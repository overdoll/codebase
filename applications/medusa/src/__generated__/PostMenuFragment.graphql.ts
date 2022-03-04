/**
 * @generated SignedSource<<5a49fbc2ee33e4972f8a6d73d6312ef9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "DISCARDED" | "DISCARDING" | "DRAFT" | "PROCESSING" | "PUBLISHED" | "PUBLISHING" | "REJECTED" | "REMOVED" | "REMOVING" | "REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostMenuFragment$data = {
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonFragment" | "PostCopyLinkButtonFragment" | "PostViewButtonFragment" | "PostModerateButtonFragment">;
  readonly " $fragmentType": "PostMenuFragment";
};
export type PostMenuFragment = PostMenuFragment$data;
export type PostMenuFragment$key = {
  readonly " $data"?: PostMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReportButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostViewButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostModerateButtonFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "432ee28a999ba7894dd555377d4d61a7";

export default node;
