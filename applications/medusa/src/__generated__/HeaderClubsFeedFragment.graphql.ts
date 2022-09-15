/**
 * @generated SignedSource<<1e3aef331f6201884f9acaa3b97c5b9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderClubsFeedFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubsFeedDiscoverListFragment">;
  readonly " $fragmentType": "HeaderClubsFeedFragment";
};
export type HeaderClubsFeedFragment$key = {
  readonly " $data"?: HeaderClubsFeedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderClubsFeedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderClubsFeedFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubsFeedDiscoverListFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "4bdc8ee979ec727e457708ad18ab5d6f";

export default node;
