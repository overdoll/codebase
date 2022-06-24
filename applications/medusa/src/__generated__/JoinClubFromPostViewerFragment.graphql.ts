/**
 * @generated SignedSource<<431e2fd83fb9cc1f8e29be80d3645e4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonViewerFragment">;
  readonly " $fragmentType": "JoinClubFromPostViewerFragment";
};
export type JoinClubFromPostViewerFragment$key = {
  readonly " $data"?: JoinClubFromPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubFromPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BecomeMemberButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "3161836ba507e34ccd2d0de82bbb2e66";

export default node;
