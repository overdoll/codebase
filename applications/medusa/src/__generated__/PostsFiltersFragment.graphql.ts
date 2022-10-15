/**
 * @generated SignedSource<<cbf8ca8bba162ea39c0e9bd027d4a5cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsFiltersFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsSupporterFiltersFragment" | "QuickPreferencesFragment">;
  readonly " $fragmentType": "PostsFiltersFragment";
};
export type PostsFiltersFragment$key = {
  readonly " $data"?: PostsFiltersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsFiltersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsFiltersFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsSupporterFiltersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuickPreferencesFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "84d07406dc09ac7757d6a60ba145984a";

export default node;
