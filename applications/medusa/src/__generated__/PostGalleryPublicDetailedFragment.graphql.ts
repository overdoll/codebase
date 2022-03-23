/**
 * @generated SignedSource<<a01f8d7e4a69d2c5b41ca3a2a0294b27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicDetailedFragment$data = {
  readonly id: string;
  readonly reference: string;
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentClubFragment">;
  };
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly " $fragmentSpreads": FragmentRefs<"PostMediaFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentFragment">;
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostSupporterContentClubFragment"
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
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "resource",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostMediaFragment"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostSupporterContentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "a208ed5c5e275f5cc09c39961044d200";

export default node;
