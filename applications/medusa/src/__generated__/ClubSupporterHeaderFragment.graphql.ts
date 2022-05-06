/**
 * @generated SignedSource<<58b3d1427c789e0c0ef1204bd1f8425d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupporterHeaderFragment$data = {
  readonly __typename: "Club";
  readonly " $fragmentType": "ClubSupporterHeaderFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ClubSupporterHeaderFragment";
};
export type ClubSupporterHeaderFragment = ClubSupporterHeaderFragment$data;
export type ClubSupporterHeaderFragment$key = {
  readonly " $data"?: ClubSupporterHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupporterHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupporterHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "48ed624f378ec1bed430773af3f3d00f";

export default node;
