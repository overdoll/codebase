/**
 * @generated SignedSource<<fc6c9208ee506855fabb51ef27b6719d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterButtonsFragment" | "ClubHeaderBannerFragment" | "ClubJoinBannerFragment" | "ClubSupportBannerFragment" | "PostClubLinksFragment">;
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
      "name": "PostClubLinksFragment"
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

(node as any).hash = "11a04c9b7ee0d15796b59f1c7b667ee4";

export default node;
