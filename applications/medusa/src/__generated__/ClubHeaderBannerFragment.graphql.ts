/**
 * @generated SignedSource<<ed37b95ef3b3cd79d2e6ff642522c4fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubHeaderBannerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubBannerFragment" | "LargeClubHeaderFragment">;
  readonly " $fragmentType": "ClubHeaderBannerFragment";
};
export type ClubHeaderBannerFragment$key = {
  readonly " $data"?: ClubHeaderBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubHeaderBannerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LargeClubHeaderFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "7ee0866af5674963c816733d2a059135";

export default node;
