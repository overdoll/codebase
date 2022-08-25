/**
 * @generated SignedSource<<f7f4b15a04bfab646d270fa894b1d58e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostMenuButtonFragment$data = {
  readonly club: {
    readonly viewerIsOwner: boolean;
  };
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"PostArchiveButtonFragment" | "PostModerateButtonFragment" | "PostReportButtonFragment" | "PostUnArchiveButtonFragment">;
  readonly " $fragmentType": "PostMenuButtonFragment";
};
export type PostMenuButtonFragment$key = {
  readonly " $data"?: PostMenuButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostMenuButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMenuButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
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
          "name": "viewerIsOwner",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostArchiveButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostUnArchiveButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostModerateButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReportButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "37732aaeecbc44dd46772e0904a27cd5";

export default node;
