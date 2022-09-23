/**
 * @generated SignedSource<<c74f3b984008c56711929bd3154e7250>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerTopFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollTopFragment">;
  readonly " $fragmentType": "ContainerTopFragment";
};
export type ContainerTopFragment$key = {
  readonly " $data"?: ContainerTopFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerTopFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerTopFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollTopFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a3f9ebbf3c5052590198c47c6cf10499";

export default node;
