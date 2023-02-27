/**
 * @generated SignedSource<<63a4b1b1bc29bc3174247c2b44859d12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RecommendedPostsGridFragment">;
  readonly " $fragmentType": "SuggestedHomeFragment";
};
export type SuggestedHomeFragment$key = {
  readonly " $data"?: SuggestedHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuggestedHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RecommendedPostsGridFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "c36f85061190d3bb7322f17b64781472";

export default node;
