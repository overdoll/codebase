/**
 * @generated SignedSource<<ade58f1cfc08414abcb7949a3048bf4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollSearchSeriesAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostsFiltersFragment">;
  readonly " $fragmentType": "ScrollSearchSeriesAccountFragment";
};
export type ScrollSearchSeriesAccountFragment$key = {
  readonly " $data"?: ScrollSearchSeriesAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchSeriesAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollSearchSeriesAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsFiltersFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "5cd3bdbe52c9ff633a493dfec680b4ac";

export default node;
