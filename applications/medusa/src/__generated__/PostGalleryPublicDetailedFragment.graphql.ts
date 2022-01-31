/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostGalleryPublicDetailedFragment = {
    readonly id: string;
    readonly reference: string;
    readonly content: ReadonlyArray<{
        readonly type: ResourceType;
        readonly " $fragmentRefs": FragmentRefs<"ImageSnippetFragment" | "ControlledVideoFragment">;
    }>;
    readonly " $refType": "PostGalleryPublicDetailedFragment";
};
export type PostGalleryPublicDetailedFragment$data = PostGalleryPublicDetailedFragment;
export type PostGalleryPublicDetailedFragment$key = {
    readonly " $data"?: PostGalleryPublicDetailedFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryPublicDetailedFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicDetailedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
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
(node as any).hash = '9f83a11c72f72e429cfce0fc9b4c8d2d';
export default node;
