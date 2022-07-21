/**
 * @generated SignedSource<<1de426ad078ba975b64badc38f2e609c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinTileViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileIconButtonViewerFragment">;
  readonly " $fragmentType": "ClubJoinTileViewerFragment";
};
export type ClubJoinTileViewerFragment$key = {
  readonly " $data"?: ClubJoinTileViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinTileViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinTileIconButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ebf59d36d89fbeceb03376b72d38a567";

export default node;
