/**
 * @generated SignedSource<<e00ced6124c87d5d53e093ce84e6cfe7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuickPreferencesFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"QuickPreferencesModalFragment">;
  readonly " $fragmentType": "QuickPreferencesFragment";
};
export type QuickPreferencesFragment$key = {
  readonly " $data"?: QuickPreferencesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuickPreferencesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickPreferencesFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuickPreferencesModalFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "98ac25c3488e3ee3b9d3546f44b290b3";

export default node;
