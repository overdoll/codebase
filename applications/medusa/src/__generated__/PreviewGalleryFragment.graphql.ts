/**
 * @generated SignedSource<<c5d65300036d4f813d6107a41a684027>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewGalleryFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"PreviewMediaFragment" | "ThumbnailCarouseItemFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"SupporterSlideFragment">;
  }>;
  readonly id: string;
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterSlidePostFragment">;
  readonly " $fragmentType": "PreviewGalleryFragment";
};
export type PreviewGalleryFragment$key = {
  readonly " $data"?: PreviewGalleryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewGalleryFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewGalleryFragment",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "media",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PreviewMediaFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ThumbnailCarouseItemFragment"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SupporterSlideFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterSlidePostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "e3ed3a9fe25fffe50d7dfdbe552c3115";

export default node;
