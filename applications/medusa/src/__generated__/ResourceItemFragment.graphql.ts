/**
 * @generated SignedSource<<a04a48a7e2cf90bd5914bd516ad08f0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceItemFragment$data = {
  readonly type: ResourceType;
  readonly processed: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
  readonly " $fragmentType": "ResourceItemFragment";
};
export type ResourceItemFragment = ResourceItemFragment$data;
export type ResourceItemFragment$key = {
  readonly " $data"?: ResourceItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceItemFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
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
      "name": "processed",
      "storageKey": null
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "1545d7151d27737bd9e8d7f92f524f4c";

export default node;
