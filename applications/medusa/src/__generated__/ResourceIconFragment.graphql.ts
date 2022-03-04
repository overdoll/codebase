/**
 * @generated SignedSource<<fa57b15a909b4b4c6cb6595735e03025>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceIconFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
  readonly " $fragmentType": "ResourceIconFragment";
};
export type ResourceIconFragment = ResourceIconFragment$data;
export type ResourceIconFragment$key = {
  readonly " $data"?: ResourceIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceIconFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageSnippetFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "VideoSnippetFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "ea40142673fd3b6d91dc17402126cae2";

export default node;
