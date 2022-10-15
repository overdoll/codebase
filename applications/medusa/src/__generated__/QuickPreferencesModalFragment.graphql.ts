/**
 * @generated SignedSource<<4d43694d3c97a1758d72a28fa960cdf4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuickPreferencesModalFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "QuickPreferencesModalFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "QuickPreferencesModalFragment";
};
export type QuickPreferencesModalFragment$key = {
  readonly " $data"?: QuickPreferencesModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuickPreferencesModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickPreferencesModalFragment",
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

(node as any).hash = "72c6e2e0ede2e740e1c12dcc54ff997f";

export default node;
