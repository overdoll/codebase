/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostGalleryPublicSimpleFragment = {
    readonly id: string;
    readonly reference: string;
    readonly content: ReadonlyArray<{
        readonly type: ResourceType;
        readonly " $fragmentRefs": FragmentRefs<"ImageSnippetFragment" | "ControlledVideoFragment">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment">;
    readonly " $refType": "PostGalleryPublicSimpleFragment";
};
export type PostGalleryPublicSimpleFragment$data = PostGalleryPublicSimpleFragment;
export type PostGalleryPublicSimpleFragment$key = {
    readonly " $data"?: PostGalleryPublicSimpleFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryPublicSimpleFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicSimpleFragment",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCategoriesFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCharactersFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'ae9654200c536b806e42fdbbac504807';
export default node;
