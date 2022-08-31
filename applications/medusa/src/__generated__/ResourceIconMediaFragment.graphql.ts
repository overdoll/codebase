/**
 * @generated SignedSource<<d52e21e013ff6ce857d6c8ca34a17cfb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceIconMediaFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
  readonly " $fragmentType": "ResourceIconMediaFragment";
};
export type ResourceIconMediaFragment$key = {
  readonly " $data"?: ResourceIconMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceIconMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceIconMediaFragment",
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

(node as any).hash = "a13c2657cd2bff663e2757882c6cefa3";

export default node;
