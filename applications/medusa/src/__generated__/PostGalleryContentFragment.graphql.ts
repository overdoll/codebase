/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostGalleryContentFragment = {
    readonly content: ReadonlyArray<{
        readonly type: ResourceType;
        readonly " $fragmentRefs": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
    }>;
    readonly " $refType": "PostGalleryContentFragment";
};
export type PostGalleryContentFragment$data = PostGalleryContentFragment;
export type PostGalleryContentFragment$key = {
    readonly " $data"?: PostGalleryContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryContentFragment",
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
(node as any).hash = '821dbfdf89aad6f0e49f941182ae7f14';
export default node;
