/**
 * @generated SignedSource<<54c916e5451735bef7d963f49abae5f3>>
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
