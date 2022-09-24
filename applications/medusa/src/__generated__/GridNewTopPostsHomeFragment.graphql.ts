/**
 * @generated SignedSource<<ca00e68a6ad5712dd4134a4da2dac54d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridNewTopPostsHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"GridTopNewPostsFragment">;
  readonly " $fragmentType": "GridNewTopPostsHomeFragment";
};
export type GridNewTopPostsHomeFragment$key = {
  readonly " $data"?: GridNewTopPostsHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridNewTopPostsHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridNewTopPostsHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GridTopNewPostsFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9e305db55b24f861dbb97deb8092637c";

export default node;
