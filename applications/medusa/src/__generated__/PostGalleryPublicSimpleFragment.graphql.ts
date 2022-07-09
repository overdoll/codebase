/**
 * @generated SignedSource<<fb86f3e7716efa137512c91ed33a0016>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicSimpleFragment$data = {
  readonly club: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentClubFragment">;
  };
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly " $fragmentSpreads": FragmentRefs<"PostMediaFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"PostSlideBackgroundFragment" | "PostSupporterContentFragment">;
  }>;
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostSlideIndexFragment">;
  readonly " $fragmentType": "PostGalleryPublicSimpleFragment";
};
export type PostGalleryPublicSimpleFragment$key = {
  readonly " $data"?: PostGalleryPublicSimpleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicSimpleFragment">;
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostSlideBackgroundFragment"
        }
      ],
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostSupporterContentClubFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSlideIndexFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "fbca981c8d5c2c62ddcec4833380a077";

export default node;
