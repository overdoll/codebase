/**
 * @generated SignedSource<<eaa4fcb0ef0324a40b2fd667a343820f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuspendedClubBannerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SuspendedClubModalFragment">;
  readonly " $fragmentType": "SuspendedClubBannerFragment";
};
export type SuspendedClubBannerFragment = SuspendedClubBannerFragment$data;
export type SuspendedClubBannerFragment$key = {
  readonly " $data"?: SuspendedClubBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendedClubBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuspendedClubBannerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SuspendedClubModalFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "49b9eaa2cfb6700fe821538e3c89cf7d";

export default node;
