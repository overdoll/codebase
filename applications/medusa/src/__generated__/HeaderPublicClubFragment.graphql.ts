/**
 * @generated SignedSource<<118435a875075a310cf2d99a507f654e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubExternalLinksFragment" | "ClubFooterButtonsFragment" | "ClubHeaderBannerFragment" | "ClubJoinBannerFragment" | "ClubSupportBannerFragment">;
  readonly " $fragmentType": "HeaderPublicClubFragment";
};
export type HeaderPublicClubFragment$key = {
  readonly " $data"?: HeaderPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubHeaderBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExternalLinksFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubFooterButtonsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "65ea5b0ba3d918b55b211eb5956c4db9";

export default node;
