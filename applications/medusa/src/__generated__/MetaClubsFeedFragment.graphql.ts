/**
 * @generated SignedSource<<3c4ed3b48ade65ef1b501ddb62eddeb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaClubsFeedFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerClubsFeedFragment">;
  readonly " $fragmentType": "MetaClubsFeedFragment";
};
export type MetaClubsFeedFragment$key = {
  readonly " $data"?: MetaClubsFeedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaClubsFeedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaClubsFeedFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerClubsFeedFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9f5caa0e8c2cae34a8b2bf4a189ea438";

export default node;
