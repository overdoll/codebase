/**
 * @generated SignedSource<<9f99aa71a9c4ad90fe9aed778d8fda65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostViewerFragment">;
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
      "name": "JoinClubFromPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "0221d43e2dbc854c5aad7e7a882570a0";

export default node;
