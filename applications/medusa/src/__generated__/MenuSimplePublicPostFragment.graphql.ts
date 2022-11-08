/**
 * @generated SignedSource<<9ef8cca0be106fd3bc8cf5d4a8159ebe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MenuSimplePublicPostFragment$data = {
  readonly club: {
    readonly viewerIsOwner: boolean;
  };
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"PostArchiveButtonFragment" | "PostEditButtonFragment" | "PostUnArchiveButtonFragment">;
  readonly " $fragmentType": "MenuSimplePublicPostFragment";
};
export type MenuSimplePublicPostFragment$key = {
  readonly " $data"?: MenuSimplePublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MenuSimplePublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuSimplePublicPostFragment",
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
      "name": "PostEditButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "b9f27019fc17b1ca0b7f35c883c89b37";

export default node;
