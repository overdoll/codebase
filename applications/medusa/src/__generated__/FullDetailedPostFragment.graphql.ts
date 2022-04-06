/**
 * @generated SignedSource<<bb97f2b28b109a73f0124829acf0bf14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostFragment$data = {
  readonly reference: string;
  readonly club: {
    readonly viewerIsOwner: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedFragment" | "PostCopyLinkButtonFragment" | "PostReportButtonFragment" | "PostModerateButtonFragment" | "PostLikeButtonFragment" | "PostHeaderClubFragment" | "PostClickableCharactersFragment" | "PostClickableCategoriesFragment" | "PostIndexerFragment" | "PostArchiveButtonFragment">;
  readonly " $fragmentType": "FullDetailedPostFragment";
};
export type FullDetailedPostFragment = FullDetailedPostFragment$data;
export type FullDetailedPostFragment$key = {
  readonly " $data"?: FullDetailedPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostCopyLinkButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReportButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostModerateButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCategoriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostIndexerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostArchiveButtonFragment"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinClubFromPostFragment"
          },
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
      "action": "THROW",
      "path": "club"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "32d07a3367ec616db5677f77641111e0";

export default node;
