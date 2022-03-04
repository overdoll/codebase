/**
<<<<<<< HEAD
 * @generated SignedSource<<2e9a71b5acc3dc1c2acc77ec6bb5c38c>>
=======
 * @generated SignedSource<<c122115b4ad0252d9ca692372c83a30c>>
>>>>>>> master
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
<<<<<<< HEAD
    readonly type: ResourceType;
    readonly " $fragmentSpreads": FragmentRefs<"PostMediaFragment">;
=======
    readonly resource: {
      readonly type: ResourceType;
      readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "ControlledVideoFragment">;
    };
>>>>>>> master
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
<<<<<<< HEAD
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostMediaFragment"
=======
>>>>>>> master
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

<<<<<<< HEAD
(node as any).hash = "536018749c7e18bc9c9cf04cee7f4ba3";
=======
(node as any).hash = "3e2d11c66cdf51bf59ace19c277b736c";
>>>>>>> master

export default node;
