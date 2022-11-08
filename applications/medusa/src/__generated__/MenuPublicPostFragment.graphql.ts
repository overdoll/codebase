/**
 * @generated SignedSource<<15d999db219fcc45fb0f88d98a22cfa9>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostArchiveButtonFragment" | "PostEditButtonFragment" | "PostModerateButtonFragment" | "PostReportButtonFragment" | "PostUnArchiveButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostEditButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "5c9edfc49657ab82b043756fa8a09de2";

export default node;
