/**
 * @generated SignedSource<<621a9007664c1a1e42f23a53545f07ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPublicHeaderViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubJoinViewerFragment" | "PostJoinClubViewerFragment">;
  readonly " $fragmentType": "PostPublicHeaderViewerFragment";
};
export type PostPublicHeaderViewerFragment$key = {
  readonly " $data"?: PostPublicHeaderViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPublicHeaderViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPublicHeaderViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostJoinClubViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubJoinViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "9ad66a17db5564e32197aa3273128d40";

export default node;
