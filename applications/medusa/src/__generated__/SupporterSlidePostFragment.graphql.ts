/**
 * @generated SignedSource<<8588392d5c238512f12b05361c0c7fb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterSlidePostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupporterLockedFragment">;
  readonly " $fragmentType": "SupporterSlidePostFragment";
};
export type SupporterSlidePostFragment$key = {
  readonly " $data"?: SupporterSlidePostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterSlidePostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterSlidePostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterLockedFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "486d394275bbf7860b00fe9f96365138";

export default node;
