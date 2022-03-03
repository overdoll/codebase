/**
 * @generated SignedSource<<c122115b4ad0252d9ca692372c83a30c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicDetailedFragment$data = {
  readonly id: string;
  readonly reference: string;
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly type: ResourceType;
      readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "ControlledVideoFragment">;
    };
  }>;
  readonly " $fragmentType": "PostGalleryPublicDetailedFragment";
};
export type PostGalleryPublicDetailedFragment = PostGalleryPublicDetailedFragment$data;
export type PostGalleryPublicDetailedFragment$key = {
  readonly " $data"?: PostGalleryPublicDetailedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedFragment">;
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
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "3e2d11c66cdf51bf59ace19c277b736c";

export default node;
