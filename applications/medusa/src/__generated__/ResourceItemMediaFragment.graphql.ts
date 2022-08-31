/**
 * @generated SignedSource<<8f8c1001838f0c473fe49671b51bab72>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceItemMediaFragment$data = {
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
  readonly " $fragmentType": "ResourceItemMediaFragment";
};
export type ResourceItemMediaFragment$key = {
  readonly " $data"?: ResourceItemMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceItemMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceItemMediaFragment",
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
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "b05e6028bcf6e5910e20de9269bb59b3";

export default node;
