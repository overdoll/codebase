/**
 * @generated SignedSource<<8edacd1ce219a69c54548854fb06f0dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportTileAccountFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "ClubSupportTileAccountFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ClubSupportTileAccountFragment";
};
export type ClubSupportTileAccountFragment$key = {
  readonly " $data"?: ClubSupportTileAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportTileAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportTileAccountFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "262da956681b1fd3092dd63901a63ab5";

export default node;
