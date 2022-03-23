/**
 * @generated SignedSource<<cff21484a8dc3691c1bf4147c3c2f092>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostReportButtonViewerFragment" | "PostLikeButtonViewerFragment" | "JoinClubFromPostViewerFragment">;
  readonly " $fragmentType": "FullDetailedPostViewerFragment";
};
export type FullDetailedPostViewerFragment = FullDetailedPostViewerFragment$data;
export type FullDetailedPostViewerFragment$key = {
  readonly " $data"?: FullDetailedPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReportButtonViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubFromPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "82e93b4e6545688bf64ea77454ce2cdb";

export default node;
