/**
 * @generated SignedSource<<0b190a652b15c2e1955da76361088a85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadCategoryStepFragment.graphql.ts
export type UploadCategoryStepFragment = {
    readonly categories: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
        readonly slug: string;
        readonly thumbnail: {
            readonly type: ResourceType;
            readonly urls: ReadonlyArray<{
                readonly mimeType: string;
                readonly url: string;
            }>;
        } | null;
    }>;
    readonly " $refType": "UploadCategoryStepFragment";
};
export type UploadCategoryStepFragment$data = UploadCategoryStepFragment;
export type UploadCategoryStepFragment$key = {
    readonly " $data"?: UploadCategoryStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadCategoryStepFragment">;
=======
import { FragmentRefs } from "relay-runtime";
export type CategoryFragment$data = {
  readonly categories: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly slug: string;
    readonly thumbnail: {
      readonly type: ResourceType;
      readonly urls: ReadonlyArray<{
        readonly mimeType: string;
        readonly url: string;
      }>;
    } | null;
  }>;
  readonly " $fragmentType": "CategoryFragment";
};
export type CategoryFragment = CategoryFragment$data;
export type CategoryFragment$key = {
  readonly " $data"?: CategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CategoryFragment">;
>>>>>>> master:applications/medusa/src/__generated__/CategoryFragment.graphql.ts
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadCategoryStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Category",
      "kind": "LinkedField",
      "name": "categories",
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
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "thumbnail",
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
              "alias": null,
              "args": null,
              "concreteType": "ResourceUrl",
              "kind": "LinkedField",
              "name": "urls",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mimeType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                }
              ],
              "storageKey": null
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
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadCategoryStepFragment.graphql.ts
(node as any).hash = 'c4c78ea4d048c88be1864218bc854652';
=======

(node as any).hash = "c6320b23d3ae53ed890d41ef56a3d811";

>>>>>>> master:applications/medusa/src/__generated__/CategoryFragment.graphql.ts
export default node;
