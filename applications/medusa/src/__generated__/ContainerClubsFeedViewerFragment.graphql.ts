/**
 * @generated SignedSource<<4726e81723b56e5fdcf0af8442c2a532>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerClubsFeedViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BannerClubsFeedViewerFragment" | "ScrollClubsFeedFragment">;
  readonly " $fragmentType": "ContainerClubsFeedViewerFragment";
};
export type ContainerClubsFeedViewerFragment$key = {
  readonly " $data"?: ContainerClubsFeedViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerClubsFeedViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerClubsFeedViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BannerClubsFeedViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollClubsFeedFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "6fbbd7a1f7b110eba724b4ca78b1d34d";

export default node;
