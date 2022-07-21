/**
 * @generated SignedSource<<836f81a6bc6bcd9d0838a3be9e32eac5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportPostConditionWrapperViewerFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "ClubSupportPostConditionWrapperViewerFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ClubSupportPostConditionWrapperViewerFragment";
};
export type ClubSupportPostConditionWrapperViewerFragment$key = {
  readonly " $data"?: ClubSupportPostConditionWrapperViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPostConditionWrapperViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportPostConditionWrapperViewerFragment",
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

(node as any).hash = "e49fe7f935f29aaa2408de5b97565458";

export default node;
