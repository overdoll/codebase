/**
 * @generated SignedSource<<19df9382de2772322729be3b117fbcd6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinBannerPublicClubFragment$data = {
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

(node as any).hash = "cc85e078dcddef2643c76b278dc258cc";

export default node;
