/**
 * @generated SignedSource<<05b8ba62d6852e53519034c9c30eabbb>>
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
