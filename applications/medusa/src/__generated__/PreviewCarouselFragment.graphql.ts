/**
 * @generated SignedSource<<bff673d63ec263abb5f6d0bce1bca052>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewCarouselFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly isSupporterOnly: boolean;
    readonly media: {
      readonly " $fragmentSpreads": FragmentRefs<"ThumbnailCarouseItemFragment">;
    };
  }>;
  readonly id: string;
  readonly reference: string;
  readonly " $fragmentType": "PreviewCarouselFragment";
};
export type PreviewCarouselFragment$key = {
  readonly " $data"?: PreviewCarouselFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewCarouselFragment">;
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
  "name": "PreviewCarouselFragment",
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
              "name": "ThumbnailCarouseItemFragment"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSupporterOnly",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "b999db65b0e51e1888a0c48678d36823";

export default node;
