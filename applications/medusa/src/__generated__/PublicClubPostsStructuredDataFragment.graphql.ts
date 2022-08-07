/**
 * @generated SignedSource<<25eb392d27a9adfc552010a0df359220>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubPostsStructuredDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"addClubPostsListJsonLdFragment">;
  readonly " $fragmentType": "PublicClubPostsStructuredDataFragment";
};
export type PublicClubPostsStructuredDataFragment$key = {
  readonly " $data"?: PublicClubPostsStructuredDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubPostsStructuredDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubPostsStructuredDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "addClubPostsListJsonLdFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "98fd686f41b6926351cf1a023ef0ed29";

export default node;
