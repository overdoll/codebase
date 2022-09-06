/**
 * @generated SignedSource<<5afe63575dbf2660614fb1c816dfc847>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicContainedFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentClubFragment">;
  };
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly resource: {
      readonly " $fragmentSpreads": FragmentRefs<"PostDetailedMediaFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"PostSlideBackgroundFragment" | "PostSupporterContentFragment">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PostSlideIndexFragment">;
  readonly " $fragmentType": "PostGalleryPublicContainedFragment";
};
export type PostGalleryPublicContainedFragment$key = {
  readonly " $data"?: PostGalleryPublicContainedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicContainedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicContainedFragment",
  "selections": [
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
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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

(node as any).hash = "5efde3dcc33dfe4affe6977e82674e6d";

export default node;
