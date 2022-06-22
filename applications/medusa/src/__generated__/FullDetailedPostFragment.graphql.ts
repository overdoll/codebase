/**
 * @generated SignedSource<<6bb4645dbda3bb35be4d1d649d5db329>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostFragment$data = {
  readonly club: {
    readonly viewerIsOwner: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostFragment">;
  };
  readonly state: PostState;
  readonly " $fragmentSpreads": FragmentRefs<"PostArchiveButtonFragment" | "PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostCopyLinkButtonFragment" | "PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment" | "PostLikeButtonFragment" | "PostModerateButtonFragment" | "PostReportButtonFragment" | "PostUnArchiveButtonFragment">;
  readonly " $fragmentType": "FullDetailedPostFragment";
};
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
      "name": "state",
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
      "name": "PostArchiveButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostUnArchiveButtonFragment"
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

(node as any).hash = "8eac7e6282ce29c5e0390f9f6e178831";

export default node;
