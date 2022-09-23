/**
 * @generated SignedSource<<e38e2364faf4452e21aa9154d1f80192>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MenuPublicPostFragment$data = {
  readonly club: {
    readonly viewerIsOwner: boolean;
  };
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"PostArchiveButtonFragment" | "PostModerateButtonFragment" | "PostReportButtonFragment" | "PostUnArchiveButtonFragment">;
  readonly " $fragmentType": "MenuPublicPostFragment";
};
export type MenuPublicPostFragment$key = {
  readonly " $data"?: MenuPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MenuPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuPublicPostFragment",
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

(node as any).hash = "31c56f037255c28f106a557a7d2fee46";

export default node;
