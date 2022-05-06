/**
 * @generated SignedSource<<a330f43ff4fd0aeeb82f76bdcd46679b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicSimpleFragment" | "PostViewButtonFragment" | "PostModerateButtonFragment" | "PostCopyLinkButtonFragment" | "PostReportButtonFragment" | "PostLikeButtonFragment" | "PostHeaderClubFragment" | "PostClickableCharactersFragment" | "PostClickableCategoriesFragment">;
  readonly " $fragmentType": "FullSimplePostFragment";
};
export type FullSimplePostFragment = FullSimplePostFragment$data;
export type FullSimplePostFragment$key = {
  readonly " $data"?: FullSimplePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicSimpleFragment"
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

(node as any).hash = "14a643b0d9ca0663f771f248912f904c";

export default node;
