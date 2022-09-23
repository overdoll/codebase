/**
 * @generated SignedSource<<c950b0bc8fd40e553ad61e59d31e2e71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubPostsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubCharacterRecommendationsFragment" | "ClubFooterCopyLinkButtonFragment" | "ClubFooterShareDiscordButtonFragment" | "ClubFooterShareRedditButtonFragment" | "ClubFooterShareTwitterButtonFragment">;
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
      "name": "ClubFooterCopyLinkButtonFragment"
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

(node as any).hash = "528230ffd24d2af357425a2d8785a1b4";

export default node;
