/**
 * @generated SignedSource<<aa563b89cefe9522bf770451d3617b8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostViewerFragment">;
  readonly " $fragmentType": "PostHeaderViewerFragment";
};
export type PostHeaderViewerFragment$key = {
  readonly " $data"?: PostHeaderViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderViewerFragment",
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

(node as any).hash = "de60930ace16f0464ab4e57c8cd80be9";

export default node;
