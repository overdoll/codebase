/**
 * @generated SignedSource<<0bb6b69900e4b04cefcb08d3e951eb55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportPublicClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportBannerFragment">;
  readonly " $fragmentType": "SupportPublicClubFragment";
};
export type SupportPublicClubFragment$key = {
  readonly " $data"?: SupportPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportPublicClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "061429aa10e7eb89963677dec1432f90";

export default node;
