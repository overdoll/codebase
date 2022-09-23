/**
 * @generated SignedSource<<119f95f84e58c0b32e7dd5cdd60602f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerRandomFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ScrollRandomFragment">;
  readonly " $fragmentType": "ContainerRandomFragment";
};
export type ContainerRandomFragment$key = {
  readonly " $data"?: ContainerRandomFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRandomFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerRandomFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollRandomFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9348f235da814039c1ca8a27697f5c02";

export default node;
