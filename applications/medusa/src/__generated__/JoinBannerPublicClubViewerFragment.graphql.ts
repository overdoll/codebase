/**
 * @generated SignedSource<<6d66ebffe0ddd666bf11df3b699b490e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinBannerPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinBannerViewerFragment">;
  readonly " $fragmentType": "JoinBannerPublicClubViewerFragment";
};
export type JoinBannerPublicClubViewerFragment$key = {
  readonly " $data"?: JoinBannerPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinBannerPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinBannerPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinBannerViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "c6e962371c1d30fc7a993562a825d5e9";

export default node;
