/**
 * @generated SignedSource<<f1503cbd0d83e261989cb85aa3d7f003>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubPostsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubCharacterRecommendationsFragment" | "ClubFooterShareDiscordButtonFragment" | "ClubFooterShareRedditButtonFragment" | "ClubFooterShareTwitterButtonFragment">;
  readonly " $fragmentType": "HeaderPublicClubPostsFragment";
};
export type HeaderPublicClubPostsFragment$key = {
  readonly " $data"?: HeaderPublicClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubPostsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubCharacterRecommendationsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareTwitterButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "05612a01b486378eb4237e120839f324";

export default node;
