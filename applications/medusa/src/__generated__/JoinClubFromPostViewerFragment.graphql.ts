/**
 * @generated SignedSource<<1f9bf2b07122c977814da04c321561c8>>
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
export type JoinClubFromPostViewerFragment = JoinClubFromPostViewerFragment$data;
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
