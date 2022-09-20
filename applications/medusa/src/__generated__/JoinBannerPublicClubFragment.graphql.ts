/**
 * @generated SignedSource<<4d057512d6a3eacc7367a7b4cda8297a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinBannerPublicClubFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterShareDiscordButtonFragment" | "ClubFooterShareLinkButtonFragment" | "ClubFooterShareRedditButtonFragment" | "ClubFooterShareTwitterButtonFragment" | "ClubHeaderBannerFragment" | "ClubJoinBannerFragment">;
  readonly " $fragmentType": "JoinBannerPublicClubFragment";
};
export type JoinBannerPublicClubFragment$key = {
  readonly " $data"?: JoinBannerPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinBannerPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinBannerPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubHeaderBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareTwitterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareDiscordButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterShareLinkButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "599becfbc0da02fa80930531e52c0982";

export default node;
