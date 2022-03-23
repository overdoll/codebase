/**
 * @generated SignedSource<<fe88647fba8b169d1ba43b8a13be5c5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonViewerFragment" | "JoinClubFromPostViewerFragment" | "PostReportButtonViewerFragment">;
  readonly " $fragmentType": "FullSimplePostViewerFragment";
};
export type FullSimplePostViewerFragment = FullSimplePostViewerFragment$data;
export type FullSimplePostViewerFragment$key = {
  readonly " $data"?: FullSimplePostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubFromPostViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReportButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "004b46a3459e59691be08834e0c88faf";

export default node;
