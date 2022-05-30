/**
 * @generated SignedSource<<4fc1925646de51a5bd8375836b5f1821>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicSimpleFragment" | "PostViewButtonFragment" | "PostModerateButtonFragment" | "PostCopyLinkButtonFragment" | "PostReportButtonFragment" | "PostLikeButtonFragment" | "PostHeaderClubFragment">;
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

(node as any).hash = "75e959073ca388ff0b576e48a223667d";

export default node;
