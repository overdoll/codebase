/**
 * @generated SignedSource<<f92c603dde8faa6377086f79880393f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SecondarySuggestedHomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubsTilesFragment" | "PopularTagsCardsFragment">;
  readonly " $fragmentType": "SecondarySuggestedHomeFragment";
};
export type SecondarySuggestedHomeFragment$key = {
  readonly " $data"?: SecondarySuggestedHomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SecondarySuggestedHomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SecondarySuggestedHomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PopularTagsCardsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscoverClubsTilesFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "e06022ce85ddfd5a6ecd4f4d32fce382";

export default node;
