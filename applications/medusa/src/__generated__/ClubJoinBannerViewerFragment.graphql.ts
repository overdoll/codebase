/**
 * @generated SignedSource<<dbe6c85dde60e22d65fa2216de7cd85d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinBannerViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonViewerFragment">;
  readonly " $fragmentType": "ClubJoinBannerViewerFragment";
};
export type ClubJoinBannerViewerFragment$key = {
  readonly " $data"?: ClubJoinBannerViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinBannerViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinBannerViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "50e9ca88f5d0f29b151165f15ae01640";

export default node;
