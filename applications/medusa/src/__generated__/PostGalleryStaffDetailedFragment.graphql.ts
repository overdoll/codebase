/**
 * @generated SignedSource<<83cf43c604e4d681f662e69c6c84ed6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryStaffDetailedFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentClubFragment">;
  };
  readonly content: ReadonlyArray<{
    readonly resource: {
      readonly " $fragmentSpreads": FragmentRefs<"PostDetailedMediaFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"PostSlideBackgroundFragment" | "PostSupporterContentFragment">;
  }>;
  readonly contributor: {
    readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentViewerFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostSlideIndexFragment">;
  readonly " $fragmentType": "PostGalleryStaffDetailedFragment";
};
export type PostGalleryStaffDetailedFragment$key = {
  readonly " $data"?: PostGalleryStaffDetailedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryStaffDetailedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryStaffDetailedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "contributor",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostSupporterContentViewerFragment"
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
              "name": "PostDetailedMediaFragment"
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSlideIndexFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "6b7cab03887dc4f26395934f4c6220bf";

export default node;
