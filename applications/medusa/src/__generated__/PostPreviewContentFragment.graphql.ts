/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostPreviewContentFragment = {
    readonly content: ReadonlyArray<{
        readonly type: ResourceType;
        readonly " $fragmentRefs": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
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
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'c0ba1d4647e10ddf88712d27dd6c15eb';
export default node;
