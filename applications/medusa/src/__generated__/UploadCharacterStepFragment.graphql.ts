/**
 * @generated SignedSource<<039b135a9ea07c62e7b8b8fd6db51ef2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadCharacterStepFragment.graphql.ts
export type UploadCharacterStepFragment = {
    readonly characters: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly series: {
            readonly title: string;
        };
        readonly slug: string;
        readonly thumbnail: {
            readonly type: ResourceType;
            readonly urls: ReadonlyArray<{
                readonly mimeType: string;
                readonly url: string;
            }>;
        } | null;
    }>;
    readonly " $refType": "UploadCharacterStepFragment";
};
export type UploadCharacterStepFragment$data = UploadCharacterStepFragment;
export type UploadCharacterStepFragment$key = {
    readonly " $data"?: UploadCharacterStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadCharacterStepFragment">;
=======
import { FragmentRefs } from "relay-runtime";
export type CharacterFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly series: {
      readonly title: string;
    };
    readonly slug: string;
    readonly thumbnail: {
      readonly type: ResourceType;
      readonly urls: ReadonlyArray<{
        readonly mimeType: string;
        readonly url: string;
      }>;
    } | null;
  }>;
  readonly " $fragmentType": "CharacterFragment";
};
export type CharacterFragment = CharacterFragment$data;
export type CharacterFragment$key = {
  readonly " $data"?: CharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterFragment">;
>>>>>>> master:applications/medusa/src/__generated__/CharacterFragment.graphql.ts
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadCharacterStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Series",
          "kind": "LinkedField",
          "name": "series",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
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
<<<<<<< HEAD:applications/medusa/src/__generated__/UploadCharacterStepFragment.graphql.ts
(node as any).hash = '5f4da5d9f5ff460d9b0ae41b6f567213';
=======

(node as any).hash = "5280b650440e05ed806a545cda52b49d";

>>>>>>> master:applications/medusa/src/__generated__/CharacterFragment.graphql.ts
export default node;
