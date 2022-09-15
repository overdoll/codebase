/**
 * @generated SignedSource<<1f1fdc9a18228c89d32c1c3b885df5bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerCreatePostClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubInformationBannerFragment">;
  readonly " $fragmentType": "BannerCreatePostClubFragment";
};
export type BannerCreatePostClubFragment$key = {
  readonly " $data"?: BannerCreatePostClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerCreatePostClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerCreatePostClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubInformationBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "759b5acd542a67ee44f32f30120f7566";

export default node;
