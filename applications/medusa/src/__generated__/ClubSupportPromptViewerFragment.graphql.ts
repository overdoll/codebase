/**
 * @generated SignedSource<<9d3c7b6cd1eacfe7b86555dfc8f1bb2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportPromptViewerFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "ClubSupportPromptViewerFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ClubSupportPromptViewerFragment";
};
export type ClubSupportPromptViewerFragment$key = {
  readonly " $data"?: ClubSupportPromptViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPromptViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportPromptViewerFragment",
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

(node as any).hash = "df9f85b989372272d38edc662e2e0652";

export default node;
