/**
 * @generated SignedSource<<2b75980d62e2a7869c54bd5dc2b1b7ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinBannerViewerFragment" | "ClubSupportBannerViewerFragment">;
  readonly " $fragmentType": "HeaderPublicClubViewerFragment";
};
export type HeaderPublicClubViewerFragment$key = {
  readonly " $data"?: HeaderPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinBannerViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportBannerViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2ccb18430def50fa46e563c2888ecffd";

export default node;
