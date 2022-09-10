/**
 * @generated SignedSource<<ac2a72674b05ff67c0ab93b8b03afc4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavigationPopupFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "NavigationPopupFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "NavigationPopupFragment";
};
export type NavigationPopupFragment$key = {
  readonly " $data"?: NavigationPopupFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavigationPopupFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavigationPopupFragment",
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

(node as any).hash = "9abe38fabcbd89841c5afbc71546a987";

export default node;
