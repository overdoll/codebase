/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type ResourceItemFragment = {
    readonly type: ResourceType;
    readonly " $fragmentRefs": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
    readonly " $refType": "ResourceItemFragment";
};
export type ResourceItemFragment$data = ResourceItemFragment;
export type ResourceItemFragment$key = {
    readonly " $data"?: ResourceItemFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
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
    }
  ],
  "type": "Resource",
  "abstractKey": null
};
(node as any).hash = '24457e38799d693c30d3528a679d0789';
export default node;
