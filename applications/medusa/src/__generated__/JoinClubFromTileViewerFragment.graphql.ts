/**
 * @generated SignedSource<<dc66db1fe8f6247a6a42d1d71318c515>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromTileViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonViewerFragment">;
  readonly " $fragmentType": "JoinClubFromTileViewerFragment";
};
export type JoinClubFromTileViewerFragment = JoinClubFromTileViewerFragment$data;
export type JoinClubFromTileViewerFragment$key = {
  readonly " $data"?: JoinClubFromTileViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromTileViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubFromTileViewerFragment",
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

(node as any).hash = "c76153facd7241f8245eeb22cdcdfbca";

export default node;
