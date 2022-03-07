/**
 * @generated SignedSource<<9b7c5e688cc046c0ee9275621ec7d182>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceInfoFragment$data = {
  readonly type: ResourceType;
  readonly processed: boolean;
  readonly videoDuration: number;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  readonly " $fragmentType": "ResourceInfoFragment";
};
export type ResourceInfoFragment = ResourceInfoFragment$data;
export type ResourceInfoFragment$key = {
  readonly " $data"?: ResourceInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceInfoFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceItemFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "processed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "videoDuration",
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "2801c80eb9b10535b43afbaba14132a9";

export default node;
