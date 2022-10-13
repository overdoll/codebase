/**
 * @generated SignedSource<<30553de992add0bd6b03b6dacd0926a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollPublicClubPostsAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsSupporterFiltersFragment">;
  readonly " $fragmentType": "ScrollPublicClubPostsAccountFragment";
};
export type ScrollPublicClubPostsAccountFragment$key = {
  readonly " $data"?: ScrollPublicClubPostsAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollPublicClubPostsAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollPublicClubPostsAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsSupporterFiltersFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2dd4d3c700b736562a3ed47cb867db64";

export default node;
