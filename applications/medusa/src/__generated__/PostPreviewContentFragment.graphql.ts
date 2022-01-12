/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostPreviewContentFragment = {
    readonly content: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    }>;
    readonly " $refType": "PostPreviewContentFragment";
};
export type PostPreviewContentFragment$data = PostPreviewContentFragment;
export type PostPreviewContentFragment$key = {
    readonly " $data"?: PostPreviewContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostPreviewContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '8a8db689417c5a5b6013e3fd259ce4cf';
export default node;
