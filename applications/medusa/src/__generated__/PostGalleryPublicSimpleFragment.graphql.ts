/**
<<<<<<< HEAD
 * @generated SignedSource<<236b8f04b62e952f545384eec2711f00>>
=======
 * @generated SignedSource<<f9d5085669193c85ea298bc97cc47c1d>>
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
export type PostGalleryPublicSimpleFragment$data = {
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
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment">;
  readonly " $fragmentType": "PostGalleryPublicSimpleFragment";
};
export type PostGalleryPublicSimpleFragment = PostGalleryPublicSimpleFragment$data;
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

<<<<<<< HEAD
(node as any).hash = "80d8eaf6ccfe2c9e57caa9b6a8a9d09f";
=======
(node as any).hash = "78ce8daf77922ef44d5fface4768babd";
>>>>>>> master

export default node;
