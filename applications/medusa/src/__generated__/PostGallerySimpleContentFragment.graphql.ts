/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostGallerySimpleContentFragment = {
    readonly content: ReadonlyArray<{
        readonly type: ResourceType;
        readonly " $fragmentRefs": FragmentRefs<"ImageSnippetFragment" | "ControlledVideoFragment">;
    }>;
    readonly " $refType": "PostGallerySimpleContentFragment";
};
export type PostGallerySimpleContentFragment$data = PostGallerySimpleContentFragment;
export type PostGallerySimpleContentFragment$key = {
    readonly " $data"?: PostGallerySimpleContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostGallerySimpleContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGallerySimpleContentFragment",
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
          "name": "ControlledVideoFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '86ba1d09d3c8b7176e61b186c045d105';
export default node;
